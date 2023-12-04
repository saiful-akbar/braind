<template>
  <card :title="`Pengoperasian Alat Telekomunikasi [${division.name}]`">
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Kode Barang</th>
            <th>NUP</th>
            <th>Nama Barang Pada SIMAK BMN</th>
            <th>Jenis Perangkat Telekomunikasi</th>
            <th>Harga Perolehan</th>
            <th>Tahun Perolehan</th>
            <th>Merk</th>
            <th>Tipe</th>
            <th>Range Frekuensi</th>
            <th>Teknologi (Analog/Digital)</th>
            <th>Kondisi (B/RR/RB)</th>
            <th>Status (Aktif/Tidak Aktif)</th>
            <th>Lokasi Penempatan</th>
            <th>Ket</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
            <th>14</th>
            <th>15</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.code }}</td>
            <td>{{ v.nup }}</td>
            <td>{{ v.name }}</td>
            <td>{{ v.type }}</td>
            <td>{{ v.acquisition_cost }}</td>
            <td>{{ v.year_of_acquisition }}</td>
            <td>{{ v.brand }}</td>
            <td>{{ v.type }}</td>
            <td>{{ v.frequency_range }}</td>
            <td>{{ v.digital_technology }}</td>
            <td>{{ v.condition }}</td>
            <td>{{ v.status }}</td>
            <td>{{ v.placement_location }}</td>
            <td>{{ v.notes }}</td>
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
  props: {
    division: {
      type: Object,
      default: {
        id: 0
      }
    }
  },
  data: () => ({
    form: new Form({
      id: 0,
      sbp: '',
      total_loss: 0,
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
    return { title: 'Pengoperasian Alat Telekomunikasi' }
  },

  created () {
    this.getList(1)
  },

  methods: {
    async getList (page) {
      const response = await axios.get(`/pub/ops/telecomunication-tools/${this.division.id}?size=10&page=${page}`);
      this.data = response.data
    },
  },
  watch: {
    $route (to, from) {
      this.getList(1)
    },
  }
}
</script>
