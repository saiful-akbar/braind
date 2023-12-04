<template>
  <card title="Pengoperasian Kapal Patroli">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          No Lambung
        </label>
        <div class="col-md-7">
          <input
            v-model="form.hull_number"
            :class="{ 'is-invalid': form.errors.has('hull_number') }"
            type="text"
            name="hull_number"
            class="form-control"
          />
          <has-error :form="form" field="hull_number" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Kondisi </label>
        <div class="col-md-7">
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
        <label class="col-md-3 col-form-label text-md-right"> Nomor SPB </label>
        <div class="col-md-7">
          <input
            v-model="form.spb_number"
            :class="{ 'is-invalid': form.errors.has('spb_number') }"
            type="text"
            name="spb_number"
            class="form-control"
          />
          <has-error :form="form" field="spb_number" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Tanggal SPB
        </label>
        <div class="col-md-7">
          <datepicker
            class="date-control"
            placeholder="Tanggal SBP"
            format="dd MMM yyyy"
            v-model="form.spb_date"
          />
          <has-error :form="form" field="spb_date" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Penerbit SPB
        </label>
        <div class="col-md-7">
          <input
            v-model="form.spb_publisher"
            :class="{ 'is-invalid': form.errors.has('spb_publisher') }"
            type="text"
            name="spb_publisher"
            class="form-control"
          />
          <has-error :form="form" field="spb_publisher" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Jumlah Hari
        </label>
        <div class="col-md-7">
          <input
            v-model="form.day_amount"
            :class="{ 'is-invalid': form.errors.has('day_amount') }"
            type="text"
            name="day_amount"
            class="form-control"
          />
          <has-error :form="form" field="day_amount" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right"> Ket </label>
        <div class="col-md-7">
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
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/operating-patrol-boat/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="operating_patrol_boats" @update="getList(1)" />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>No Lambung</th>
            <th>Kondisi</th>
            <th>Nomor SPB</th>
            <th>Tanggal SPB</th>
            <th>Penerbit SPB</th>
            <th>Jumlah Hari</th>
            <th>Ket</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.hull_number }}</td>
            <td>{{ v.condition }}</td>
            <td>{{ v.spb_number }}</td>
            <td>{{ v.spb_date }}</td>
            <td>{{ v.spb_publisher }}</td>
            <td>{{ v.day_amount }}</td>
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
            <th colspan="11">Data tidak ditemukan</th>
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
import Datepicker from 'vuejs-datepicker'
import ExportButton from '../../components/ExportButton.vue';
import ImportButtons from '../../components/ImportButtons.vue';

export default {
  scrollToTop: false,

  data: () => ({
    form: new Form({
      id: 0,
      hull_number: '',
      condition: '',
      spb_number: '',
      spb_date: null,
      spb_publisher: null,
      day_amount: 0,
      notes: '',
      input_date: null,
    }),
    data: {},
    page: 1,
  }),

  components: {
    TableNumber,
    Paginator,
    Datepicker,
    ExportButton,
    ImportButtons
  },

  head () {
    return { title: 'Pengawasan Kapal Patroli' }
  },

  created () {
    this.getList(1)
  },

  methods: {
    async action () {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/operating-patrol-boat/${this.form.id}`);
      } else {
        response = await this.form.post('/operating-patrol-boat');
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
      const response = await axios.get(`/operating-patrol-boat?size=10&page=${page}&${q}`);
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
      if (confirm(`Yakin akan menghapus data "${v.name}" ?`)) {
        try {
          const response = await axios.delete(`/operating-patrol-boat/${v.id}`)
          this.getList()
        } catch (e) {

        }
      }
    },
    watch: {
      $route (to, from) {
        this.getList(1)
      },
    }
  }
}
</script>
