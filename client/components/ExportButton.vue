<template>
  <a class="link btn btn-success" @click="exportExcel">Export Excel</a>
</template>
<script>
import axios from 'axios';

export default {
  props: {
    url: String
  },
  methods: {
    exportExcel () {
      axios.get(this.url).then(res => {
        let url = res && res.data && res.data.data ? res.data.data.url : '/';
        window.open(url, '_blank');
      })
    }
  }
}
</script>