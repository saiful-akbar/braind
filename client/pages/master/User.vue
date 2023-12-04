<template>
  <div>
    <card v-if="mustVerifyEmail" title="Pendaftaran User">
      <div class="alert alert-success" role="alert">
        {{ $t("verify_email_address") }}
      </div>
    </card>
    <card v-else title="User">
      <form @submit.prevent="register" @keydown="form.onKeydown($event)">
        <!-- Name -->
        <div class="form-group row">
          <label class="col-md-3 col-form-label text-md-right">{{
            $t("name")
          }}</label>
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

        <div class="form-group row">
          <label class="col-md-3 col-form-label text-md-right"> Kanwil</label>
          <div class="col-md-7">
            <select v-model="form.division" class="form-control">
              <option :value="o" v-for="(o, k) in divisions" :key="k">
                {{ o.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-md-3 col-form-label text-md-right"> Role</label>
          <div class="col-md-7">
            <select v-model="form.role" class="form-control">
              <option value="admin">Admin</option>
              <option value="kanwil">Kanwil</option>
            </select>
          </div>
        </div>

        <!-- Email -->
        <div class="form-group row">
          <label class="col-md-3 col-form-label text-md-right">{{
            $t("email")
          }}</label>
          <div class="col-md-7">
            <input
              v-model="form.email"
              :class="{ 'is-invalid': form.errors.has('email') }"
              type="email"
              name="email"
              class="form-control"
              :readonly="form.id != ''"
            />
            <has-error :form="form" field="email" />
          </div>
        </div>

        <!-- Password -->
        <div class="form-group row">
          <label class="col-md-3 col-form-label text-md-right">{{
            $t("password")
          }}</label>
          <div class="col-md-7">
            <input
              v-model="form.password"
              :class="{ 'is-invalid': form.errors.has('password') }"
              type="password"
              name="password"
              class="form-control"
              placeholder="Silahkan isi password untuk reset password"
            />
            <has-error :form="form" field="password" />
          </div>
        </div>

        <!-- Password Confirmation -->
        <div class="form-group row">
          <label class="col-md-3 col-form-label text-md-right">{{
            $t("confirm_password")
          }}</label>
          <div class="col-md-7">
            <input
              v-model="form.password_confirmation"
              :class="{
                'is-invalid': form.errors.has('password_confirmation'),
              }"
              type="password"
              name="password_confirmation"
              class="form-control"
            />
            <has-error :form="form" field="password_confirmation" />
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-7 offset-md-3 d-flex">
            <!-- Submit Button -->
            <v-button v-if="!form.id" :loading="form.busy"> Tambah </v-button>
            <v-button v-else :loading="form.busy"> Edit </v-button>
            <button class="btn btn-warning ml-2 mr-2" @click="reset">
              Reset
            </button>
            <export-button url="/user/export/excel" />
          </div>
        </div>
      </form>

      <div style="overflow: auto">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Kanwil</th>
              <th>Tanggal Registrasi</th>
              <th>Role</th>
              <th width="175">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, k) in data.data" :key="k">
              <td><table-number :paginate="data.paginate" :index="k" /></td>
              <td>{{ v.name }}</td>
              <td>{{ v.email }}</td>
              <td>{{ v.division ? v.division.name : "-" }}</td>
              <td>{{ v.created_at | formatDateTime }}</td>
              <td>{{ v.role }}</td>
              <td>
                <a class="link link-edit" @click="doEdit(v)">Edit</a>
                |
                <a
                  :href="`/admin/user/access/${v.id}`"
                  class="link link-access"
                >
                  Access
                </a>
                |
                <a class="link link-delete" @click="doDelete(v)">Delete</a>
                <br />
              </td>
            </tr>
          </tbody>
          <tbody v-if="data && data.data && data.data.length <= 0">
            <tr>
              <th colspan="6">Data tidak ditemukan</th>
            </tr>
          </tbody>
        </table>
      </div>
      <paginator :paginate="data.paginate" @changePage="changePage" />
    </card>
  </div>
</template>

<script>
import Form from 'vform'
import axios from 'axios'
import TableNumber from '@/components/TableNumber'
import Paginator from '@/components/Paginator';
import ExportButton from '@/components/ExportButton';

export default {
  middleware: 'auth',

  components: {
    TableNumber, Paginator, ExportButton
  },

  data: () => ({
    form: new Form({
      id: 0,
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: '',
      division: null
    }),
    mustVerifyEmail: false,
    data: {},
    divisions: []
  }),

  head () {
    return { title: "User" }
  },

  created () {
    this.getList(1)
    this.getDivision()
  },

  methods: {
    async register () {
      let data

      // Register the user.
      try {
        let response = null;
        if (this.form.id) {
          response = await this.form.put(`/user/${this.form.id}`)
        } else {
          response = await this.form.post('/auth/register')
        }
        data = response.data
      } catch (e) {
        return
      }

      // Must verify email fist.
      if (data.status) {
        this.mustVerifyEmail = true
      } else {
        this.reset();
        this.getList(1)
      }
    },
    async getDivision () {
      const response = await axios.get(`/pub/division`);
      this.divisions = response.data.data
    },
    async getList (page) {
      const query = this.$route.query
      let q = '';
      if (query && query.q) {
        q = `q=${query.q}`
      }
      const response = await axios.get(`/user?size=10&page=${page}&${q}`);
      this.data = response.data
    },
    doEdit (v) {
      this.form.reset();
      this.form.clear();
      this.form.fill(v);
    },
    changePage (p) {
      this.getList(p)
    },
    reset () {
      this.form.clear();
      this.form.reset();
    },
    async doDelete (v) {
      if (confirm(`Yakin akan menghapus data "${v.name}" ?`)) {
        try {
          const response = await axios.delete(`/user/${v.id}`)
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
