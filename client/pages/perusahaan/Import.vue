<template>
  <card title="Data Perusahaan Import">
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
            placeholder="Nama Perusahaan"
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
          Jumlah PIB
        </label>
        <div class="col-md-7">
          <input
            v-model="form.pib"
            :class="{ 'is-invalid': form.errors.has('pib') }"
            type="number"
            step="any"
            name="pib"
            class="form-control"
            placeholder="PIB"
          />
          <has-error :form="form" field="pib" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Bruto </label>
        <div class="col-md-7">
          <input
            v-model="form.bruto"
            :class="{ 'is-invalid': form.errors.has('bruto') }"
            type="number"
            step="any"
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
            type="number"
            step="any"
            name="netto"
            class="form-control"
          />
          <has-error :form="form" field="netto" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Bayar BM </label>
        <div class="col-md-7">
          <input
            v-model="form.bm_pay"
            :class="{ 'is-invalid': form.errors.has('bm_pay') }"
            type="number"
            step="any"
            name="bm_pay"
            class="form-control"
          />
          <has-error :form="form" field="bm_pay" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Total Bayar
        </label>
        <div class="col-md-7">
          <input
            v-model="form.total_pay"
            :class="{ 'is-invalid': form.errors.has('total_pay') }"
            type="number"
            step="any"
            name="total_pay"
            class="form-control"
            placeholder="Total Bayar"
          />
          <has-error :form="form" field="total_pay" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/import-company/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="import_companies" @update="getList(1)" />

    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Perusahaan</th>
            <th>NPWP</th>
            <th>Jumlah PIB</th>
            <th>Bruto</th>
            <th>Netto</th>
            <th>Bayar BM</th>
            <th>Total Bayar</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.name }}</td>
            <td>{{ v.tax_number }}</td>
            <td>{{ format(v.pib) }}</td>
            <td>{{ format(v.bruto) }}</td>
            <td>{{ format(v.netto) }}</td>
            <td>{{ format(v.bm_pay) }}</td>
            <td>{{ format(v.total_pay) }}</td>
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
import ImportButtons from "@/components/ImportButtons.vue";
import { mapGetters } from "vuex";
import { numberFormat } from "@/utils";

export default {
  scrollToTop: false,

  data: () => ({
    form: new Form({
      id: 0,
      name: "",
      pib: "",
      total_pay: 0,
      income_duty: 0,
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
    return { title: "Perusahaan Import" };
  },

  created() {
    this.getList(1);
  },

  methods: {
    async action() {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/import-company/${this.form.id}`);
      } else {
        response = await this.form.post("/import-company");
      }
      this.getList(1);
      this.form.clear();
      this.form.reset();
    },
    async getList(page) {
      const query = this.$route.query;
      let q = "";
      if (query && query.q) {
        q = query.q;
      }
      const response = await axios.get(
        `/import-company?size=10&page=${page}&${q && q != "" ? "q=" + q : ""}`
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
          const response = await axios.delete(`/import-company/${v.id}`);
          this.getList(1);
        } catch (e) {}
      }
    },

    // Number format
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
