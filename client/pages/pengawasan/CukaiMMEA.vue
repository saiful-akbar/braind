<template>
  <card title="Data Pengawasan Cukai MMEA">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> SBP </label>
        <div class="col-md-7">
          <input
            v-model="form.sbp"
            :class="{ 'is-invalid': form.errors.has('sbp') }"
            type="text"
            name="sbp"
            class="form-control"
          />
          <has-error :form="form" field="sbp" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Kantor </label>
        <div class="col-md-7">
          <input
            v-model="form.name"
            :class="{ 'is-invalid': form.errors.has('name') }"
            type="text"
            name="name"
            class="form-control"
          />
          <has-error :form="form" field="name" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Total Kerugian
        </label>
        <div class="col-md-7">
          <input
            v-model="form.total"
            :class="{ 'is-invalid': form.errors.has('total') }"
            type="number"
            name="total"
            class="form-control"
          />
          <has-error :form="form" field="total" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Tindak Lanjut
        </label>
        <div class="col-md-7">
          <input
            v-model="form.follow_up"
            :class="{ 'is-invalid': form.errors.has('follow_up') }"
            type="text"
            name="follow_up"
            class="form-control"
          />
          <has-error :form="form" field="follow_up" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Nilai Barang
        </label>
        <div class="col-md-7">
          <input
            v-model="form.item_value"
            :class="{ 'is-invalid': form.errors.has('item_value') }"
            type="number"
            name="item_value"
            class="form-control"
          />
          <has-error :form="form" field="item_value" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Nilai Potensi Kerugian Negara
        </label>
        <div class="col-md-7">
          <input
            v-model="form.loss_value"
            :class="{ 'is-invalid': form.errors.has('loss_value') }"
            type="number"
            name="loss_value"
            class="form-control"
          />
          <has-error :form="form" field="loss_value" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/control/export/excel?type=cmm" />
        </div>
      </div>
    </form>
    <import-buttons importData="controls-mmea" @update="getList(1)" />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Kantor</th>
            <th>SBP</th>
            <th>Tindak Lanjut</th>
            <th>Nilai barang</th>
            <th>Nilai Potensi Kerugian Negara</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.name }}</td>
            <td>{{ v.sbp }}</td>
            <td>{{ v.follow_up }}</td>
            <td>{{ format(v.item_value) }}</td>
            <td>{{ format(v.loss_value) }}</td>
            <td>
              <a class="link" @click="doEdit(v)">Edit</a>
              |
              <a class="link" @click="doDelete(v)">Delete</a>
            </td>
          </tr>
        </tbody>
        <tbody v-if="data && data.data && data.data.length <= 0">
          <tr>
            <th colspan="10">Data tidak ditemukan</th>
          </tr>
        </tbody>
      </table>
    </div>
    <paginator :paginate="data.paginate" @changePage="changePage" />
  </card>
</template>

<script>
import Form from "vform";
import axios from "axios";
import TableNumber from "@/components/TableNumber";
import Paginator from "@/components/Paginator";
import ExportButton from "../../components/ExportButton.vue";
import ImportButtons from "../../components/ImportButtons.vue";
import { numberFormat } from "@/utils";

export default {
  scrollToTop: false,

  data: () => ({
    form: new Form({
      id: 0,
      name: "",
      sbp: "",
      total: 0,
      follow_up: "",
      item_value: 0,
      input_date: null,
      type: "cmm",
    }),
    data: {},
    page: 1,
  }),

  components: {
    TableNumber,
    Paginator,
    ExportButton,
    ImportButtons,
  },

  head() {
    return { title: "Pengawasan Cukai MMEA" };
  },

  created() {
    this.getList(1);
  },

  methods: {
    async action() {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/control/${this.form.id}`);
      } else {
        response = await this.form.post("/control");
      }
      this.getList(1);
      this.form.clear();
      this.form.reset();
    },
    async getList(page) {
      const query = this.$route.query;
      let q = "";
      if (query && query.q) {
        q = `q=${query.q}`;
      }
      const response = await axios.get(
        `/control?type=cmm&size=10&page=${page}&${q}`
      );
      this.data = response.data;
      // this.$router.push({ query: { p: response.data && response.data.paginate ? response.data.paginate.page : 1 } })
    },
    doEdit(v) {
      this.form.clear();
      this.form.reset();
      this.form.fill(v);
    },
    changePage(p) {
      this.getList(p);
    },
    async doDelete(v) {
      if (confirm(`Yakin akan menghapus data "${v.name}" ?`)) {
        try {
          const response = await axios.delete(`/control/${v.id}`);
          this.getList();
        } catch (e) {}
      }
    },

    // fnumber format
    format(number) {
      return numberFormat(number, 2);
    },
  },
  watch: {
    $route(to, from) {
      this.getList(1);
    },
  },
};
</script>
