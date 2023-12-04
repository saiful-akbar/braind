<template>
  <card :title="`Pengoperasian Senjata Api [${division.name}]`">
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th rowspan="2">No</th>
            <th colspan="3">Senjata Api Dinas</th>
            <th rowspan="2">Berlaku S/D</th>
            <th rowspan="2">Kondisi (B/RR/RB)</th>
            <th colspan="3">Pemegang Senjata</th>
            <th rowspan="2">Jumlah Amunisi</th>
            <th rowspan="2">Ket</th>
          </tr>
          <tr>
            <th>Jenis Kaliber</th>
            <th>Nomor Senjata</th>
            <th>Nomor Buku Pas</th>
            <th>Nama</th>
            <th>Pangkat</th>
            <th>Jabatan</th>
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.caliber_type }}</td>
            <td>{{ v.weapon_number }}</td>
            <td>{{ v.pass_book_number }}</td>
            <td>{{ v.validity_period }}</td>
            <td>{{ v.condition }}</td>
            <td>{{ v.weapon_holder_name }}</td>
            <td>{{ v.weapon_holder_rank }}</td>
            <td>{{ v.weapon_holder_position }}</td>
            <td>{{ v.ammo_amount }}</td>
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
    return { title: 'Pengoperasian Senjata Api' }
  },

  created () {
    this.getList(1)
  },

  methods: {
    async getList (page) {
      const response = await axios.get(`/pub/ops/senjata-api/${this.division.id}?size=10&page=${page}`);
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
