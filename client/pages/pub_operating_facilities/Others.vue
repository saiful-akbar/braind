<template>
  <card :title="`Pengoperasian Sarana Operasi Lainnya [${division.name}]`">
    <div style="overflow: auto">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis Sarana Operasi</th>
            <th>Tipe / Merk</th>
            <th>Lokasi Penempatan</th>
            <th>Kondisi</th>
            <th>Ket</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k) in data.data" :key="k">
            <td><table-number :paginate="data.paginate" :index="k" /></td>
            <td>{{ v.type_of_operation }}</td>
            <td>{{ v.type }}</td>
            <td>{{ v.placement_location }}</td>
            <td>{{ v.condition }}</td>
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
    return { title: 'Pengoperasian Sarana Operasi Lainnya' }
  },

  created () {
    this.getList(1)
  },

  methods: {
    async getList (page) {
      const response = await axios.get(`/pub/ops/others/${this.division.id}?size=10&page=${page}`);
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
