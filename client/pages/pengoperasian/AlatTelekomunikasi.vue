<template>
  <card title="Pengoperasian Alat Telekomunikasi">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Kode Barang
        </label>
        <div class="col-md-6">
          <input
            v-model="form.code"
            :class="{ 'is-invalid': form.errors.has('code') }"
            type="text"
            name="code"
            class="form-control"
          />
          <has-error :form="form" field="code" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right"> NUP </label>
        <div class="col-md-6">
          <input
            v-model="form.nup"
            :class="{ 'is-invalid': form.errors.has('nup') }"
            type="text"
            name="nup"
            class="form-control"
          />
          <has-error :form="form" field="nup" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Nama Barang Pada Simak BMN
        </label>
        <div class="col-md-6">
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
        <label class="col-md-4 col-form-label text-md-right">
          Jenis Perangkat Telekomunikasi
        </label>
        <div class="col-md-6">
          <input
            v-model="form.device_type"
            :class="{ 'is-invalid': form.errors.has('device_type') }"
            type="text"
            name="device_type"
            class="form-control"
          />
          <has-error :form="form" field="device_type" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Harga Perolehan
        </label>
        <div class="col-md-6">
          <input
            v-model="form.acquisition_cost"
            :class="{ 'is-invalid': form.errors.has('acquisition_cost') }"
            type="text"
            name="acquisition_cost"
            class="form-control"
          />
          <has-error :form="form" field="acquisition_cost" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Tahun Perolehan
        </label>
        <div class="col-md-6">
          <input
            v-model="form.year_of_acquisition"
            :class="{ 'is-invalid': form.errors.has('year_of_acquisition') }"
            type="text"
            name="year_of_acquisition"
            class="form-control"
          />
          <has-error :form="form" field="year_of_acquisition" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right"> Merk </label>
        <div class="col-md-6">
          <input
            v-model="form.brand"
            :class="{ 'is-invalid': form.errors.has('brand') }"
            type="text"
            name="brand"
            class="form-control"
          />
          <has-error :form="form" field="brand" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right"> Tipe </label>
        <div class="col-md-6">
          <input
            v-model="form.type"
            :class="{ 'is-invalid': form.errors.has('type') }"
            type="text"
            name="type"
            class="form-control"
          />
          <has-error :form="form" field="type" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Range Frekuensi
        </label>
        <div class="col-md-6">
          <input
            v-model="form.frequency_range"
            :class="{ 'is-invalid': form.errors.has('frequency_range') }"
            type="text"
            name="frequency_range"
            class="form-control"
          />
          <has-error :form="form" field="frequency_range" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Teknologi Digital
        </label>
        <div class="col-md-6">
          <input
            v-model="form.digital_technology"
            :class="{ 'is-invalid': form.errors.has('digital_technology') }"
            type="text"
            name="digital_technology"
            class="form-control"
          />
          <has-error :form="form" field="digital_technology" />
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
        <label class="col-md-4 col-form-label text-md-right"> Status </label>
        <div class="col-md-6">
          <input
            v-model="form.status"
            :class="{ 'is-invalid': form.errors.has('status') }"
            type="text"
            name="status"
            class="form-control"
          />
          <has-error :form="form" field="status" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Lokasi Penempatan
        </label>
        <div class="col-md-6">
          <input
            v-model="form.placement_location"
            :class="{ 'is-invalid': form.errors.has('placement_location') }"
            type="text"
            name="placement_location"
            class="form-control"
          />
          <has-error :form="form" field="placement_location" />
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
          <export-button url="/operating-telecomunication-tools/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons
      importData="operating_telecomunication_tools"
      @update="getList(1)"
    />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Barang</th>
            <th>NUP</th>
            <th>Nama Barang Pada Simak BMN</th>
            <th>Jenis Perangkat Telekomunikasi</th>
            <th>Harga Perolehan</th>
            <th>Tahun Perolehan</th>
            <th>Merk</th>
            <th>Tipe</th>
            <th>Range Frekuensi</th>
            <th>Teknologi Digital</th>
            <th>Kondisi</th>
            <th>Status</th>
            <th>Lokasi Penempatan</th>
            <th>Keterangan</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.code }}</td>
            <td>{{ v.nup }}</td>
            <td>{{ v.name }}</td>
            <td>{{ v.device_type }}</td>
            <td>{{ format(v.acquisition_cost) }}</td>
            <td>{{ format(v.year_of_acquisition, 0) }}</td>
            <td>{{ v.brand }}</td>
            <td>{{ v.type }}</td>
            <td>{{ v.frequency_range }}</td>
            <td>{{ v.digital_technology }}</td>
            <td>{{ v.condition }}</td>
            <td>{{ v.status }}</td>
            <td>{{ v.placement_location }}</td>
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
            <th colspan="18">Data tidak ditemukan</th>
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
      code: "",
      nup: "",
      name: "",
      device_type: "",
      acquisition_cost: 0,
      year_of_acquisition: "",
      brand: "",
      type: "",
      frequency_range: "",
      digital_technology: "",
      condition: "",
      status: "",
      placement_location: "",
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
    return { title: "Pengawasan Alat Telekomunikasi" };
  },

  created() {
    this.getList(1);
  },

  methods: {
    format(number, minimumDigits = 2) {
      return numberFormat(number, minimumDigits);
    },
    async action() {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(
          `/operating-telecomunication-tools/${this.form.id}`
        );
      } else {
        response = await this.form.post("/operating-telecomunication-tools");
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
        `/operating-telecomunication-tools?size=10&page=${page}&${q}`
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
          const response = await axios.delete(
            `/operating-telecomunication-tools/${v.id}`
          );
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
