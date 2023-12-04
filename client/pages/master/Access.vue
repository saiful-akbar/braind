<template>
  <div>
    <card title="Akses User">
      <table style="width: 100%">
        <tbody>
          <tr>
            <td>
              <span>Nama: </span>
              <strong>{{ user.name }}</strong>
            </td>
            <td>
              <span> Kanwil: </span>
              <strong v-if="user.division">
                {{ user.division.name }}
              </strong>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="overflow: auto; border-top: 1px solid #efefef" class="mt-2">
        <ul v-for="(v, k) in menu" :key="k">
          <span class="row">
            <input type="checkbox" v-model="v.access" />
            &nbsp;<strong>Menu {{ v.name }}</strong>
          </span>
          <li v-for="(vc, kc) in v.children" :key="k * kc">
            <input type="checkbox" v-model="vc.access" />
            {{ vc.name }}
          </li>
        </ul>
      </div>
      <button class="btn btn-success" @click="save">Simpan</button>
    </card>
  </div>
</template>

<script>
import Form from 'vform'
import axios from 'axios'

export default {
  middleware: 'auth',

  components: {
  },

  data: () => ({
    form: new Form({
      id: 0,
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }),
    user: {},
    menu: []
  }),

  head () {
    return { title: "User" }
  },

  created () {
    const params = this.$route.params;
    if (params.id) {
      this.get(params.id);
      this.getMenu(params.id)
    }
  },

  methods: {
    save () {
      axios.post("/menu/access/" + this.user.id, this.menu).then(() => {
        this.$router.push({ name: 'master.user' })
      });
    },
    get (userId) {
      axios.get(`/user/${userId}`).then((res) => {
        this.user = res.data.data
      })
    },
    getMenu (id) {
      axios.get(`/menu/access/${id}`).then(res => {
        this.menu = res.data.data
      })
    },
  }
}
</script>
