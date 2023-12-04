<template>
  <card title="Pengoperasian Alat Telekomunikasi">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Pemindai/Pendeteksi
        </label>
        <div class="col-md-6">
          <input
            v-model="form.scanner"
            :class="{ 'is-invalid': form.errors.has('scanner') }"
            type="text"
            name="scanner"
            class="form-control"
          />
          <has-error :form="form" field="scanner" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right"> Nama Alat </label>
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
          Ukuran Alat
        </label>
        <div class="col-md-6">
          <input
            v-model="form.tool_size"
            :class="{ 'is-invalid': form.errors.has('tool_size') }"
            type="text"
            name="tool_size"
            class="form-control"
          />
          <has-error :form="form" field="tool_size" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right"> Merek </label>
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
          Nomor Seri Mesin
        </label>
        <div class="col-md-6">
          <input
            v-model="form.serial_number"
            :class="{ 'is-invalid': form.errors.has('serial_number') }"
            type="text"
            name="serial_number"
            class="form-control"
          />
          <has-error :form="form" field="serial_number" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Singgle Dual view
        </label>
        <div class="col-md-6">
          <input
            v-model="form.singgle_dual_view"
            :class="{ 'is-invalid': form.errors.has('singgle_dual_view') }"
            type="text"
            name="singgle_dual_view"
            class="form-control"
          />
          <has-error :form="form" field="singgle_dual_view" />
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
          Jam Operasi
        </label>
        <div class="col-md-6">
          <input
            v-model="form.operating_hours"
            :class="{ 'is-invalid': form.errors.has('operating_hour') }"
            type="text"
            name="operating_hour"
            class="form-control"
          />
          <has-error :form="form" field="operating_hour" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right"> Jam Scan </label>
        <div class="col-md-6">
          <input
            v-model="form.scan_hours"
            :class="{ 'is-invalid': form.errors.has('scan_hours') }"
            type="text"
            name="scan_hours"
            class="form-control"
          />
          <has-error :form="form" field="scan_hours" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right">
          Jumlah Scan
        </label>
        <div class="col-md-6">
          <input
            v-model="form.number_of_scans"
            :class="{ 'is-invalid': form.errors.has('number_of_scans') }"
            type="number"
            name="number_of_scans"
            class="form-control"
          />
          <has-error :form="form" field="number_of_scans" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-4 col-form-label text-md-right"> Output </label>
        <div class="col-md-6">
          <input
            v-model="form.output"
            :class="{ 'is-invalid': form.errors.has('output') }"
            type="text"
            name="output"
            class="form-control"
          />
          <has-error :form="form" field="output" />
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
          <export-button url="/operating-scanner/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="operating_scanners" @update="getList(1)" />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Pemindai/Pendeteksi</th>
            <th>Nama Alat</th>
            <th>Ukuran Alat</th>
            <th>Merek</th>
            <th>Tipe</th>
            <th>Nomor Seri Mesin</th>
            <th>Singgle Dual view</th>
            <th>Tahun Perolehan</th>
            <th>Kondisi</th>
            <th>Lokasi Penempatan</th>
            <th>Jam Operasi</th>
            <th>Jam Scan</th>
            <th>Jumlah Scan</th>
            <th>Output</th>
            <th>Keterangan</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.scanner }}</td>
            <td>{{ v.name }}</td>
            <td>{{ v.tool_size }}</td>
            <td>{{ v.brand }}</td>
            <td>{{ v.type }}</td>
            <td>{{ v.serial_number }}</td>
            <td>{{ v.singgle_dual_view }}</td>
            <td>{{ v.year_of_acquisition }}</td>
            <td>{{ v.condition }}</td>
            <td>{{ v.placement_location }}</td>
            <td>{{ v.operating_hours }}</td>
            <td>{{ v.scan_hours }}</td>
            <td>{{ v.number_of_scans }}</td>
            <td>{{ v.output }}</td>
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
            <th colspan="19">Data tidak ditemukan</th>
          </tr>
        </tbody>
      </table>
    </div>
    <paginator :paginate="data.paginate" @changePage="changePage" />
  </card>
</template>

<script>
import Form from 'vform'
import axios from 'axios'
import TableNumber from '@/components/TableNumber'
import Paginator from '@/components/Paginator';
import ExportButton from '../../components/ExportButton.vue';
import ImportButtons from '../../components/ImportButtons.vue';

export default {
  scrollToTop: false,

  data: () => ({
    form: new Form({
      id: 0,
      scanner: '',
      name: '',
      tool_size: '',
      brand: '',
      type: '',
      serial_number: '',
      singgle_dual_view: '',
      year_of_acquisition: '',
      condition: '',
      placement_location: '',
      operating_hours: '',
      scan_hours: '',
      number_of_scans: '',
      output: '',
      notes: '',
      input_date: null,
    }),
    data: {},
    page: 1,
  }),

  components: {
    TableNumber,
    Paginator,
    ExportButton,
    ImportButtons
  },

  head () {
    return { title: 'Pengawasan Alat Pemindai dan Pendeteksi' }
  },

  created () {
    this.getList(1)
  },

  methods: {
    async action () {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/operating-scanner/${this.form.id}`);
      } else {
        response = await this.form.post('/operating-scanner');
      }
      this.getList(1)
      this.form.clear();
      this.form.reset();
    },
    async getList (page) {
      const query = this.$route.query
      let q = '';
      if (query && query.q) {
        q = `q=${query.q}`
      }
      const response = await axios.get(`/operating-scanner?size=10&page=${page}&${q}`);
      this.data = response.data
      // this.$router.push({ query: { p: response.data && response.data.paginate ? response.data.paginate.page : 1 } })
    },
    doEdit (v) {
      this.form.clear();
      this.form.reset();
      this.form.fill(v);
    },
    changePage (p) {
      this.getList(p)
    },
    async doDelete (v) {
      if (confirm(`Yakin akan menghapus data "${v.caliber_type}" ?`)) {
        try {
          const response = await axios.delete(`/operating-scanner/${v.id}`)
          this.getList()
        } catch (e) {

        }
      }
    }
  },
  watch: {
    $route (to, from) {
      this.getList(1)
    },
  }
}
</script>
