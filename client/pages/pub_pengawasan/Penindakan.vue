<template>
  <card title="Data Pengawasan Penindakan">
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>NO</th>
            <th>Kantor / KPPBC</th>
            <th>SBP NOMOR</th>
            <th>SBP TANGGAL</th>
            <th>KODE KOMODITI</th>
            <th>JUMLAH</th>
            <th>URAIAN DETIL BARANG</th>
            <th>PERKIRAAN NILAI BARANG</th>
            <th>POTENSI KURANG BAYAR</th>
            <th>TINDAK LANJUT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.division_name }} / {{ v.kppbc }}</td>
            <td>{{ v.sbp_number }}</td>
            <td>{{ v.sbp_date }}</td>
            <td>{{ v.comodity_code }}</td>
            <td class="text-right">{{ v.amount | formatNumber}}</td>
            <td>{{ v.description }}</td>
            <td class="text-right">{{ v.estimated_item_value | formatNumber }}</td>
            <td class="text-right">{{ v.underpayment_potential | formatNumber }}</td>
            <td>{{ v.follow_up }}</td>
          </tr>
        </tbody>
        <tbody v-if="data && data.data && data.data.length <= 0">
          <tr>
            <th colspan="8">Data tidak ditemukan</th>
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
    return { title: 'Pengawasan Import' }
  },

  created () {
    this.getList(1)
  },

  methods: {
    async getList (page) {
      const response = await axios.get(`/pub/action?type=imp&size=10&page=${page}`);
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
