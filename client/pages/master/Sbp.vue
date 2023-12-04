<template>
  <card title="Data Penerimaan">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Nama Kantor
        </label>
        <div class="col-md-7">
          <span class="form-control">{{
            user.division ? user.division.name : "-"
          }}</span>
          <has-error :form="form" field="division" />
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
          Tindak Lanjut
        </label>
        <div class="col-md-7">
          <input
            v-model="form.follow_up"
            :class="{ 'is-invalid': form.errors.has('follow_up') }"
            type="number"
            name="follow_up"
            class="form-control"
            maxlength="3"
          />
          <has-error :form="form" field="follow_up" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
          <export-button url="/sbp/export/excel" />
        </div>
      </div>
    </form>
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Kanwil</th>
            <th>Jumlah</th>
            <th>Tindak Lanjut</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.division_name }}</td>
            <td>{{ v.amount | formatNumber }}</td>
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
            <th colspan="7">Data tidak ditemukan</th>
          </tr>
        </tbody>
      </table>
    </div>
    <paginator :paginate="data.paginate" @changePage="changePage" />
  </card>
</template>

<script>
import Form from 'vform';
import axios from 'axios';
import TableNumber from '@/components/TableNumber'
import Paginator from '@/components/Paginator';
import ExportButton from '../../components/ExportButton.vue';
import { mapGetters } from 'vuex';

export default {
  scrollToTop: false,
  data: () => ({
    form: new Form({
      id: 0,
      division: '',
      amount: 0,
      follow_up: 0,
      input_date: null,
    }),
    data: {},
    page: 1,
  }),

  components: {
    TableNumber,
    Paginator,
    ExportButton,
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  head () {
    return { title: 'Perusahaan HT HTPL' }
  },

  created () {
    this.form.division = this.user.division
    this.getList(1)
  },

  methods: {
    async action () {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/sbp/${this.form.id}`);
      } else {
        response = await this.form.post('/sbp');
      }
      this.getList(1)
      this.form.clear();
      this.form.reset();
      this.form.division = this.user.division;
    },
    async getList (page) {
      const query = this.$route.query
      let q = '';
      if (query && query.q) {
        q = `q=${query.q}`
      }
      const response = await axios.get(`/sbp?size=10&page=${page}&${q}`);
      this.data = response.data
      // this.$router.push({ query: { p: response.data && response.data.paginate ? response.data.paginate.page : 1 } })
    },
    doEdit (v) {
      this.form.clear();
      this.form.reset();
      v.division = this.user.division;
      this.form.fill(v);
    },
    changePage (p) {
      this.getList(p)
    },
    async doDelete (v) {
      if (confirm(`Yakin akan menghapus data "${v.name}" ?`)) {
        try {
          const response = await axios.delete(`/sbp/${v.id}`)
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
