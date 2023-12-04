<template>
  <card title="Data Perusahaan Cukai MMEA">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Kantor </label>
        <div class="col-md-7">
          <span class="form-control" v-if="user && user.division">{{
            user.division.name
          }}</span>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Nama Perusahaan
        </label>
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
        <label class="col-md-3 col-form-label text-md-right"> NPPBKC </label>
        <div class="col-md-7">
          <input
            v-model="form.nppbkc"
            :class="{ 'is-invalid': form.errors.has('nppbkc') }"
            type="text"
            name="nppbkc"
            class="form-control"
          />
          <has-error :form="form" field="nppbkc" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Jumlah CK 1
        </label>
        <div class="col-md-7">
          <input
            v-model="form.number_of_documents"
            :class="{ 'is-invalid': form.errors.has('number_of_documents') }"
            type="number"
            name="number_of_documents"
            class="form-control"
          />
          <has-error :form="form" field="number_of_documents" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Jumlah Liter
        </label>
        <div class="col-md-7">
          <input
            v-model="form.number_of_liters"
            :class="{ 'is-invalid': form.errors.has('number_of_liters') }"
            type="number"
            name="number_of_liters"
            class="form-control"
          />
          <has-error :form="form" field="number_of_liters" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Nilai Cukai
        </label>
        <div class="col-md-7">
          <input
            v-model="form.amount_of_excise_duty"
            :class="{ 'is-invalid': form.errors.has('amount_of_excise_duty') }"
            type="number"
            name="amount_of_excise_duty"
            class="form-control"
          />
          <has-error :form="form" field="amount_of_excise_duty" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/cukai-mmea-company/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="cukai_mmea_companies" @update="getList(1)" />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Perusahaan</th>
            <th>NPPBKC</th>
            <th>Jumlah CK 1</th>
            <th>Jumlah Liter</th>
            <th>Nilai Cukai</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.name }}</td>
            <td>{{ v.nppbkc }}</td>
            <td>{{ format(v.number_of_documents) }}</td>
            <td>{{ format(v.number_of_liters, 2) }}</td>
            <td>{{ format(v.amount_of_excise_duty, 2) }}</td>
            <td>
              <a class="link" @click="doEdit(v)">Edit</a>
              |
              <a class="link" @click="doDelete(v)">Delete</a>
            </td>
          </tr>
        </tbody>
        <tbody v-if="data && data.data && data.data.length <= 0">
          <tr>
            <th colspan="8">Data tidak ditemukan</th>
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
import ExportButton from "@/components/ExportButton";
import ImportButtons from "../../components/ImportButtons.vue";
import { mapGetters } from "vuex";
import { numberFormat } from "../../utils";

export default {
  scrollToTop: false,
  data: () => ({
    form: new Form({
      id: 0,
      name: "",
      number_of_documents: "",
      number_of_liters: 0,
      amount_of_excise_duty: 0,
      input_date: null,
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

  computed: mapGetters({
    user: "auth/user",
  }),

  head() {
    return { title: "Perusahaan Cukai MMEA" };
  },

  created() {
    this.getList(1);
  },

  methods: {
    async action() {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/cukai-mmea-company/${this.form.id}`);
      } else {
        response = await this.form.post("/cukai-mmea-company");
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
        `/cukai-mmea-company?size=10&page=${page}&${q}`
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
          const response = await axios.delete(`/cukai-mmea-company/${v.id}`);
          this.getList();
        } catch (e) {}
      }
    },

    // format angka
    format(number, minimumDigits = 0) {
      return numberFormat(number, minimumDigits);
    },
  },
  watch: {
    $route(to, from) {
      this.getList(1);
    },
  },
};
</script>
