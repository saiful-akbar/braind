<template>
  <card title="Data Pengawasan Import">
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Kantor</th>
            <th>SBP Expor</th>
            <th>Total Kerugian</th>
            <th>Tindak Lanjut</th>
            <th>Nilai barang</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.name }}</td>
            <td>{{ v.sbp }} Dokumen</td>
            <td class="text-right">{{ v.total | formatNumber}} Rupiah</td>
            <td>{{ v.follow_up }} Dokumen</td>
            <td class="text-right">{{ v.item_value | formatNumber}} Rupiah</td>
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

export default {
  scrollToTop: false,

  data: () => ({
    form: new Form({
      id: 0,
      sbp: '',
      total: 0,
      follow_up: '',
      item_value: 0,
      input_date: null,
      type: 'imp',
    }),
    data: {},
    page: 1,
  }),

  components: {
    TableNumber,
    Paginator,
    Datepicker,
  },

  head () {
    return { title: 'Pengawasan Expor' }
  },

  created () {
    this.getList(1)
  },

  methods: {
    async getList (page) {
      const response = await axios.get(`/pub/control?type=exp&size=10&page=${page}`);
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
  }
}
</script>
