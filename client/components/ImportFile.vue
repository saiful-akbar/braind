<template>
  <div>
    <button class="upload-button" @click="klik">Import Excel</button>
    <input
      :id="`getFile${id}`"
      type="file"
      ref="file"
      @change="upload"
      class="form-control"
      style="display: none"
    />
  </div>
</template>
<script>
import axios from 'axios';
export default {
  props: {
    modelValue: {
      type: String,
    },
    id: {
      type: String,
      default: '0'
    },
    importData: String
  },
  components: {
  },
  data () {
    return {
      fileUrl: ''
    }
  },
  methods: {
    upload () {
      this.$emit('update:modelValue', 'test')
      const files = this.$refs.file.files;
      let fileObj = files[0]
      this.fileUrl = window.URL.createObjectURL(fileObj);
      let formData = new FormData();
      formData.append('file', fileObj)
      formData.append('import_data', this.importData)
      axios.post(`/file/import`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.fileUrl = res.data.data.url
        const file = {
          uri: res.data.data.uri,
          url: res.data.data.url,
          mime_type: res.data.data.mime_type,
        };
        this.$emit('update:modelValue', file)
        this.$emit('change', file)
      })
    },
    klik () {
      document.getElementById('getFile' + this.id).click()
    }
  }
}
</script>