<template>
  <card title="Data Perusahaan Cukai HT + HPTL">
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
          Jumlah CK-1
        </label>
        <div class="col-md-7">
          <input
            v-model="form.ck_amount"
            :class="{ 'is-invalid': form.errors.has('ck_amount') }"
            type="number"
            name="ck_amount"
            class="form-control"
          />
          <has-error :form="form" field="ck_amount" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Jenis BKC </label>
        <div class="col-md-7">
          <input
            v-model="form.bkc_type"
            :class="{ 'is-invalid': form.errors.has('bkc_type') }"
            type="text"
            name="bkc_type"
            class="form-control"
          />
          <has-error :form="form" field="bkc_type" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Jumlah </label>
        <div class="col-md-7">
          <input
            v-model="form.amount"
            :class="{ 'is-invalid': form.errors.has('amount') }"
            type="number"
            name="amount"
            class="form-control"
          />
          <has-error :form="form" field="amount" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Nilai Cukai
        </label>
        <div class="col-md-7">
          <input
            v-model="form.tax_amount"
            :class="{ 'is-invalid': form.errors.has('tax_amount') }"
            type="number"
            name="tax_amount"
            class="form-control"
          />
          <has-error :form="form" field="tax_amount" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/cukai-ht-hptl-company/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="cukai_ht_hptl_companies" @update="getList(1)" />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Perusahaan</th>
            <th>NPPBKC</th>
            <th>Jumlah CK-1</th>
            <th>Jenis BKC</th>
            <th>Jumlah</th>
            <th>Nilai Cukai</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.name }}</td>
            <td>{{ v.nppbkc }}</td>
            <td>{{ format(v.ck_amount) }}</td>
            <td>{{ v.bkc_type }}</td>
            <td>{{ format(v.amount) }}</td>
            <td>{{ format(v.tax_amount) }}</td>
            <td>
              <a class="link" @click="doEdit(v)">Edit</a>
              |
              <a class="link" @click="doDelete(v)">Delete</a>
            </td>
          </tr>
        </tbody>
        <tbody v-if="data && data.data && data.data.length <= 0">
          <tr>
            <th colspan="7">Data tidak ditemukan</th>
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
import { mapGetters } from "vuex";
import { numberFormat } from "../../utils";

export default {
  scrollToTop: false,
  data: () => ({
    form: new Form({
      id: 0,
      name: "",
      ck_amount: "",
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
    return { title: "Perusahaan HT HTPL" };
  },

  created() {
    this.getList(1);
  },

  methods: {
    async action() {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(
          `/cukai-ht-hptl-company/${this.form.id}`
        );
      } else {
        response = await this.form.post("/cukai-ht-hptl-company");
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
        `/cukai-ht-hptl-company?size=10&page=${page}&${q}`
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
          const response = await axios.delete(`/cukai-ht-hptl-company/${v.id}`);
          this.getList();
        } catch (e) {}
      }
    },

    // format angka
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
