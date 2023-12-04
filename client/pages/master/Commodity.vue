<template>
  <card title="Data Kode Komodity">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Kode Komodity
        </label>
        <div class="col-md-7">
          <input
            v-model="form.label"
            :class="{ 'is-invalid': form.errors.has('label') }"
            type="text"
            label="label"
            class="form-control"
          />
          <has-error :form="form" field="label" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success"> Simpan </v-button>
        </div>
      </div>
    </form>
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Komodity</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.label }}</td>
            <td>
              <a class="link link-edit" @click="doEdit(v)">Edit</a>
              |
              <a class="link link-delete" @click="doDelete(v)">Delete</a>
            </td>
          </tr>
        </tbody>
        <tbody v-if="data && data.data && data.data.length <= 0">
          <tr>
            <th colspan="3">Data tidak ditemukan</th>
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
import Datepicker from 'vuejs-datepicker';
import { mapGetters } from 'vuex';

export default {
  scrollToTop: false,
  data: () => ({
    form: new Form({
      id: 0,
      label: '',
    }),
    data: {},
    page: 1,
  }),

  components: {
    TableNumber,
    Paginator,
    Datepicker,
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  head () {
    return { title: 'Data Kode Komodity' }
  },

  created () {
    this.form.commodity = this.user.commodity
    this.getList(1)
  },

  methods: {
    async action () {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/commodity/${this.form.id}`);
      } else {
        response = await this.form.post('/commodity');
      }
      this.getList(1)
      this.form.clear();
      this.form.reset();
      this.form.commodity = this.user.commodity;
    },
    async getList (page) {
      const query = this.$route.query
      let q = '';
      if (query && query.q) {
        q = `q=${query.q}`
      }
      const response = await axios.get(`/commodity?size=10&page=${page}&${q}`);
      this.data = response.data
      // this.$router.push({ query: { p: response.data && response.data.paginate ? response.data.paginate.page : 1 } })
    },
    doEdit (v) {
      this.form.clear();
      this.form.reset();
      v.commodity = this.user.commodity;
      this.form.fill(v);
    },
    changePage (p) {
      this.getList(p)
    },
    async doDelete (v) {
      if (confirm(`Yakin akan menghapus data "${v.label}" ?`)) {
        try {
          const response = await axios.delete(`/commodity/${v.id}`)
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
