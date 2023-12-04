<template>
  <card
    :title="`Pengoperasian Alat Pemindai dan Pendeteksi [${division.name}]`"
  >
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">Pemindai/Pendeteksi</th>
            <th rowspan="2">Nama Alat</th>
            <th colspan="8">Jenis Sarana Operasi</th>
            <th colspan="4">Pengoperasian</th>
            <th rowspan="2">Ket</th>
          </tr>
          <tr>
            <th>Ukuran Alat</th>
            <th>Merk</th>
            <th>Tipe</th>
            <th>Nomor Seri Mesin</th>
            <th>Single/Dual View</th>
            <th>Tahun Perolehan</th>
            <th>Kondisi (R/RR/RB)</th>
            <th>Lokasi Penempatan</th>
            <th>Jam Operasi</th>
            <th>Jam Scan</th>
            <th>Jumlah Scan</th>
            <th>Output (NHI/SBP/Tagihan BM dan PDRI)</th>
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
            <th>16</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.scanner }}</td>
            <td>{{ v.name }}</td>
            <td>{{ v.tool_size }}</td>
            <td>{{ v.brand }}</td>
            <td>{{ v.type }}</td>
            <td>{{ v.serial_number }}</td>
            <td>{{ v.singgle_dual_view }}</td>
            <td>{{ v.year_of_acquisition }}</td>
            <td>{{ v.condition }}</td>
            <td>{{ v.placement_location }}</td>
            <td>{{ v.operating_hours }}</td>
            <td>{{ v.scan_hours }}</td>
            <td>{{ v.number_of_scans }}</td>
            <td>{{ v.output }}</td>
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
    return { title: 'Pengoperasian Alat Pemindai dan Pendeteksi' }
  },

  created () {
    this.getList(1)
  },

  methods: {
    async getList (page) {
      const response = await axios.get(`/pub/ops/alat-pemindai/${this.division.id}?size=10&page=${page}`);
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
