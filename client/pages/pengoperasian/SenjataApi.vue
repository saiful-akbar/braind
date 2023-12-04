<template>
  <card title="Pengoperasian Senjata Api">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Jenis Kaliber
        </label>
        <div class="col-md-6">
          <input
            v-model="form.caliber_type"
            :class="{ 'is-invalid': form.errors.has('caliber_type') }"
            type="text"
            name="caliber_type"
            class="form-control"
          />
          <has-error :form="form" field="caliber_type" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Nomor Senjata
        </label>
        <div class="col-md-6">
          <input
            v-model="form.weapon_number"
            :class="{ 'is-invalid': form.errors.has('weapon_number') }"
            type="text"
            name="weapon_number"
            class="form-control"
          />
          <has-error :form="form" field="weapon_number" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Nomor Buku Pas
        </label>
        <div class="col-md-6">
          <input
            v-model="form.pass_book_number"
            :class="{ 'is-invalid': form.errors.has('pass_book_number') }"
            type="text"
            name="pass_book_number"
            class="form-control"
          />
          <has-error :form="form" field="pass_book_number" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Masa Berlaku
        </label>
        <div class="col-md-6">
          <input
            v-model="form.validity_period"
            :class="{ 'is-invalid': form.errors.has('validity_period') }"
            type="text"
            name="validity_period"
            class="form-control"
          />
          <has-error :form="form" field="validity_period" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right"> Kondisi </label>
        <div class="col-md-6">
          <input
            v-model="form.condition"
            :class="{ 'is-invalid': form.errors.has('condition') }"
            type="text"
            name="condition"
            class="form-control"
          />
          <has-error :form="form" field="condition" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Nama Pemegang Senjata
        </label>
        <div class="col-md-6">
          <input
            v-model="form.weapon_holder_name"
            :class="{ 'is-invalid': form.errors.has('weapon_holder_name') }"
            type="text"
            name="weapon_holder_name"
            class="form-control"
          />
          <has-error :form="form" field="weapon_holder_name" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Nama Pemegang Pangkat
        </label>
        <div class="col-md-6">
          <input
            v-model="form.weapon_holder_rank"
            :class="{ 'is-invalid': form.errors.has('weapon_holder_rank') }"
            type="text"
            name="weapon_holder_rank"
            class="form-control"
          />
          <has-error :form="form" field="weapon_holder_rank" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Pangkat Pemegang Senjata
        </label>
        <div class="col-md-6">
          <input
            v-model="form.weapon_holder_position"
            :class="{ 'is-invalid': form.errors.has('weapon_holder_position') }"
            type="text"
            name="weapon_holder_position"
            class="form-control"
          />
          <has-error :form="form" field="weapon_holder_position" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Jumlah Amunisi
        </label>
        <div class="col-md-6">
          <input
            v-model="form.ammo_amount"
            :class="{ 'is-invalid': form.errors.has('ammo_amount') }"
            type="text"
            name="ammo_amount"
            class="form-control"
          />
          <has-error :form="form" field="ammo_amount" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Keterangan
        </label>
        <div class="col-md-6">
          <input
            v-model="form.notes"
            :class="{ 'is-invalid': form.errors.has('notes') }"
            type="text"
            name="notes"
            class="form-control"
          />
          <has-error :form="form" field="notes" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-8 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/operating-firearm/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="operating_firearms" @update="getList(1)" />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Kaliber</th>
            <th>Nomor Senjata</th>
            <th>Nomor Buku Pas</th>
            <th>Masa Berlaku</th>
            <th>Kondisi</th>
            <th>Nama Pemegang Senjata</th>
            <th>Jabatan Pemegang Senjata</th>
            <th>Pangkat Pemegang Senjata</th>
            <th>Jumlah Amunisi</th>
            <th>Keterangan</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.caliber_type }}</td>
            <td>{{ v.weapon_number }}</td>
            <td>{{ v.pass_book_number }}</td>
            <td>{{ v.validity_period }}</td>
            <td>{{ v.condition }}</td>
            <td>{{ v.weapon_holder_name }}</td>
            <td>{{ v.weapon_holder_rank }}</td>
            <td>{{ v.weapon_holder_position }}</td>
            <td>{{ format(v.ammo_amount, 0) }}</td>
            <td>{{ v.notes }}</td>
            <td>
              <a class="link" @click="doEdit(v)">Edit</a>
              |
              <a class="link" @click="doDelete(v)">Delete</a>
            </td>
          </tr>
        </tbody>
        <tbody v-if="data && data.data && data.data.length <= 0">
          <tr>
            <th colspan="14">Data tidak ditemukan</th>
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
      caliber_type: "",
      weapon_number: "",
      pass_book_number: "",
      validity_period: "",
      condition: "",
      weapon_holder_name: "",
      weapon_holder_rank: "",
      weapon_holder_position: "",
      ammo_amount: "",
      notes: "",
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
    return { title: "Pengawasan Kapal Patroli" };
  },

  created() {
    this.getList(1);
  },

  methods: {
    format(number, digits = 2) {
      return numberFormat(number, digits);
    },
    async action() {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/operating-firearm/${this.form.id}`);
      } else {
        response = await this.form.post("/operating-firearm");
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
        `/operating-firearm?size=10&page=${page}&${q}`
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
      if (confirm(`Yakin akan menghapus data "${v.caliber_type}" ?`)) {
        try {
          const response = await axios.delete(`/operating-firearm/${v.id}`);
          this.getList();
        } catch (e) {}
      }
    },
  },
  watch: {
    $route(to, from) {
      this.getList(1);
    },
  },
};
</script>
