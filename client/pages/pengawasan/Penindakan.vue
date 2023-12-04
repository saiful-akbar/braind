<template>
  <card title="Data Pengawasan Penindakan">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Kantor </label>
        <div class="col-md-7">
          <span class="form-control" v-if="user && user.division"
            >{{ user.division.name }}
          </span>
          <select
            class="form-control"
            v-model="form.division_id"
            :class="{ 'is-invalid': form.errors.has('division_id') }"
            placeholder="Pilih Divisi"
            v-else
          >
            <option value="">Pilih Divisi</option>
            <option :value="d.id" v-for="(d, k) in divisions" :key="k">
              {{ d.name }}
            </option>
          </select>
          <has-error :form="form" field="division_id" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> KPPBC </label>
        <div class="col-md-7">
          <input
            v-model="form.kppbc"
            :class="{ 'is-invalid': form.errors.has('kppbc') }"
            type="text"
            name="kppbc"
            class="form-control"
            placeholder="KPPBC"
          />
          <has-error :form="form" field="kppbc" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          SBP Number
        </label>
        <div class="col-md-7">
          <input
            v-model="form.sbp_number"
            :class="{ 'is-invalid': form.errors.has('sbp_number') }"
            type="text"
            name="sbp_number"
            class="form-control"
            placeholder="Nomor SBP"
          />
          <has-error :form="form" field="sbp_number" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          SBP Tanggal
        </label>
        <div class="col-md-7">
          <datepicker
            class="date-control"
            placeholder="Tanggal SBP"
            format="dd MMM yyyy"
            v-model="form.sbp_date"
          />
          <has-error :form="form" field="sbp_date" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Kode Komoditi
        </label>
        <div class="col-md-7">
          <select
            class="form-control"
            v-model="form.comodity_code"
            :class="{ 'is-invalid': form.errors.has('comodity_code') }"
            placeholder="Pilih Kode Komoditi"
          >
            <option value="">Pilih Kode Komoditi</option>
            <option :value="c.label" v-for="(c, k) in commodities" :key="k">
              {{ c.label }}
            </option>
          </select>
          <has-error :form="form" field="comodity_code" />
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
            placeholder="Jumlah"
          />
          <has-error :form="form" field="amount" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Uraian Detil Barang
        </label>
        <div class="col-md-7">
          <input
            v-model="form.description"
            :class="{ 'is-invalid': form.errors.has('description') }"
            type="text"
            name="description"
            class="form-control"
            placeholder="Uraian Detil Barang"
          />
          <has-error :form="form" field="description" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Perkiraan Nilai Barang
        </label>
        <div class="col-md-7">
          <input
            v-model="form.estimated_item_value"
            :class="{ 'is-invalid': form.errors.has('estimated_item_value') }"
            type="number"
            name="estimated_item_value"
            class="form-control"
            placeholder="Perkiraan Nilai Barang"
          />
          <has-error :form="form" field="estimated_item_value" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Potensi Kurang Bayar
        </label>
        <div class="col-md-7">
          <input
            v-model="form.underpayment_potential"
            :class="{ 'is-invalid': form.errors.has('underpayment_potential') }"
            type="number"
            name="underpayment_potential"
            class="form-control"
            placeholder="Potensi Kurang Bayar"
          />
          <has-error :form="form" field="underpayment_potential" />
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
            type="number"
            name="follow_up"
            class="form-control"
            placeholder="Tindak Lanjut"
          />
          <has-error :form="form" field="follow_up" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/action/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="actions" @update="getList(1)" />

    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>NO</th>
            <th>KPPBC</th>
            <th>SBP NOMOR</th>
            <th>SBP TANGGAL</th>
            <th>KODE KOMODITI</th>
            <th>JUMLAH</th>
            <th>URAIAN DETIL BARANG</th>
            <th>PERKIRAAN NILAI BARANG</th>
            <th>POTENSI KURANG BAYAR</th>
            <th>TINDAK LANJUT</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.kppbc }}</td>
            <td>{{ v.sbp_number }}</td>
            <td>{{ v.sbp_date }}</td>
            <td>{{ v.comodity_code }}</td>
            <td class="text-right">{{ format(v.amount) }}</td>
            <td>{{ v.description }}</td>
            <td class="text-right">{{ format(v.estimated_item_value) }}</td>
            <td class="text-right">{{ format(v.underpayment_potential) }}</td>
            <td>{{ v.follow_up }}</td>
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
import Datepicker from "vuejs-datepicker";
import ImportButtons from "@/components/ImportButtons.vue";
import { mapGetters } from "vuex";
import { numberFormat } from "@/utils";

export default {
  scrollToTop: false,

  data: () => ({
    form: new Form({
      id: 0,
      division_id: "",
      name: "",
      pib: "",
      total_pay: 0,
      income_duty: 0,
      input_date: null,
      comodity_code: "",
    }),
    data: {},
    page: 1,
    commodities: [],
    divisions: [],
  }),

  components: {
    TableNumber,
    Paginator,
    Datepicker,
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
    this.getCommodities();
    this.getDivisions();
  },

  methods: {
    async action() {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/action/${this.form.id}`);
      } else {
        response = await this.form.post("/action");
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
        `/action?size=10&page=${page}&${q && q != "" ? "q=" + q : ""}`
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
    async getCommodities() {
      await axios.get(`/commodity`).then((res) => {
        this.commodities = res.data.data;
      });
    },
    async getDivisions() {
      await axios.get(`/division`).then((res) => {
        this.divisions = res.data.data;
      });
    },
    async doDelete(v) {
      if (confirm(`Yakin akan menghapus data "${v.name}" ?`)) {
        try {
          const response = await axios.delete(`/action/${v.id}`);
          this.getList(1);
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
