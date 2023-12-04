<template>
  <card title="Sarana Operasi Lainnya">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Jenis Operasi
        </label>
        <div class="col-md-7">
          <input
            v-model="form.type_of_operation"
            :class="{ 'is-invalid': form.errors.has('type_of_operation') }"
            type="text"
            name="type_of_operation"
            class="form-control"
          />
          <has-error :form="form" field="type_of_operation" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Tipe Merek
        </label>
        <div class="col-md-7">
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
        <label class="col-md-3 col-form-label text-md-right">
          Lokasi Penempatan
        </label>
        <div class="col-md-7">
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
          <export-button url="/operating-other/export/excel" />
        </div>
      </div>
    </form>
    <import-buttons importData="operating_others" @update="getList(1)" />
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Operasi</th>
            <th>Tipe Merek</th>
            <th>Lokasi Penempatan</th>
            <th>Kondisi</th>
            <th>Ket</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.type_of_operation }}</td>
            <td>{{ v.type }}</td>
            <td>{{ v.placement_location }}</td>
            <td>{{ v.condition }}</td>
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
            <th colspan="9">Data tidak ditemukan</th>
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
      type_of_operation: '',
      type: '',
      placement_location: '',
      condition: '',
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
    return { title: 'Sarana Operasi Lainnya' }
  },

  created () {
    this.getList(1)
  },

  methods: {
    async action () {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/operating-other/${this.form.id}`);
      } else {
        response = await this.form.post('/operating-other');
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
      const response = await axios.get(`/operating-other?size=10&page=${page}&${q}`);
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
      if (confirm(`Yakin akan menghapus data "${v.type}" ?`)) {
        try {
          const response = await axios.delete(`/operating-other/${v.id}`)
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
