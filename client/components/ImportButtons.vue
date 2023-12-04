<template>
  <div class="form-group row col-md-12">
    <button class="upload-button mr-2" @click="downloadExcel">
      Excel Template
    </button>
    <import-file @change="importFile" :importData="importData" />
  </div>
</template>
<script>
import axios from 'axios';
import ImportFile from './ImportFile.vue';

export default {
  components: { ImportFile },
  props: {
    importData: String,
  },
  methods: {
    downloadExcel () {
      axios.get(`/template/excel/${this.importData}`).then(res => {
        let url = res && res.data && res.data.data ? res.data.data.url : '/';
        window.open(url, '_blank');
      })
    },
    importFile (f) {
      this.$emit('update')
    }
  }
}
</script>