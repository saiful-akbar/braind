<template>
  <card title="Data Perusahaan Export">
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
        <label class="col-md-3 col-form-label text-md-right"> NPWP </label>
        <div class="col-md-7">
          <input
            v-model="form.tax_number"
            :class="{ 'is-invalid': form.errors.has('tax_number') }"
            type="text"
            name="tax_number"
            class="form-control"
          />
          <has-error :form="form" field="tax_number" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Jumlah PEB
        </label>
        <div class="col-md-7">
          <input
            v-model="form.peb"
            :class="{ 'is-invalid': form.errors.has('peb') }"
            type="number"
            name="peb"
            class="form-control"
          />
          <has-error :form="form" field="peb" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Bruto </label>
        <div class="col-md-7">
          <input
            v-model="form.bruto"
            :class="{ 'is-invalid': form.errors.has('bruto') }"
            type="text"
            name="bruto"
            class="form-control"
          />
          <has-error :form="form" field="bruto" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Netto </label>
        <div class="col-md-7">
          <input
            v-model="form.netto"
            :class="{ 'is-invalid': form.errors.has('netto') }"
            type="text"
            name="netto"
            class="form-control"
          />
          <has-error :form="form" field="netto" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Devisa </label>
        <div class="col-md-7">
          <input
            v-model="form.devisa"
            :class="{ 'is-invalid': form.errors.has('devisa') }"
            type="text"
            name="devisa"
            class="form-control"
          />
          <has-error :form="form" field="devisa" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Bea Keluar
        </label>
        <div class="col-md-7">
          <input
            v-model="form.export_duty"
            :class="{ 'is-invalid': form.errors.has('export_duty') }"
            type="text"
            name="export_duty"
            class="form-control"
          />
          <has-error :form="form" field="export_duty" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/export-company/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="export_companies" @update="getList(1)" />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Perusahaan</th>
            <th>NPWP</th>
            <th>Jumlah PEB</th>
            <th>Bruto</th>
            <th>Netto</th>
            <th>Devisa Expor</th>
            <th>Bea Keluar</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.name }}</td>
            <td>{{ v.tax_number }}</td>
            <td>{{ format(v.peb) }}</td>
            <td>{{ format(v.bruto) }}</td>
            <td>{{ format(v.netto) }}</td>
            <td>{{ format(v.devisa) }}</td>
            <td>{{ format(v.export_duty) }}</td>
            <td>
              <a class="link" @click="doEdit(v)">Edit</a>
              |
              <a class="link" @click="doDelete(v)">Delete</a>
            </td>
          </tr>
        </tbody>
        <tbody v-if="data && data.data && data.data.length <= 0">
          <tr>
            <th colspan="9">Data tidak ditemukan</th>
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
import { numberFormat } from "@/utils";

export default {
  scrollToTop: false,

  data: () => ({
    form: new Form({
      id: 0,
      name: "",
      peb: "",
      devisa: 0,
      export_duty: 0,
      netto: 0,
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

  head() {
    return { title: "Perusahaan Export" };
  },

  computed: mapGetters({
    user: "auth/user",
  }),

  created() {
    this.getList(1);
  },

  methods: {
    async action() {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/export-company/${this.form.id}`);
      } else {
        response = await this.form.post("/export-company");
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
        `/export-company?size=10&page=${page}&${q}`
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
          const response = await axios.delete(`/export-company/${v.id}`);
          this.getList();
        } catch (e) {}
      }
    },

    // format anggka
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
