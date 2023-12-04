<template>
  <card title="Data Kanwil">
    <form @submit.prevent="action" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('info_updated')" />

      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">
          Nama Kantor
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
            <th>Nama Kanwil</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.name }}</td>
            <td>
              <a class="link link-edit" @click="doEdit(v)">Edit</a>
              |
              <a class="link link-delete" @click="doDelete(v)">Delete</a>
              |
              <a class="link link-access" :href="`/admin/division/profile`"
                >Profile</a
              >
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
      name: '',
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
    return { title: 'Data Kanwil' }
  },

  created () {
    this.form.division = this.user.division
    this.getList(1)
  },

  methods: {
    async action () {
      let response = null;
      if (this.form.id) {
        response = await this.form.put(`/division/${this.form.id}`);
      } else {
        response = await this.form.post('/division');
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
      const response = await axios.get(`/division?size=10&page=${page}&${q}`);
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
          const response = await axios.delete(`/division/${v.id}`)
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
