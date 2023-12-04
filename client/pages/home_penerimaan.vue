<template>
  <div v-if="chartData">
    <h3 class="text-center">Grafik Penerimaan</h3>
    <Bar :chart-data="chartData" v-if="chartData" />
  </div>
</template>

<script>
// DataPage.vue
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  computed: {
  },
  data: () => ({
    chartData: {
      labels: [],
      datasets: [
      ]
    }
  }),
  async created () {
    await axios.get(`/pub/receipt/chart`).then(res => {
      if (res && res.data && res.data.data) {
        this.chartData = res.data.data
      }
    })
  },
  methods: {
  }
}
</script>
