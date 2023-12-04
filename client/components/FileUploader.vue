<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <!-- <img
      v-if="modelValue && modelValue.url"
      :src="modelValue.url"
      style="width: 100%"
      class="mb-2"
    /> -->
    <img
      v-if="fileUrl != ''"
      :src="fileUrl"
      style="
        width: 100%;
        cursor: pointer;
        width: 82px;
        overflow: hidden;
        border-radius: 8px;
      "
      class="mb-2 border-2 border-gray-300"
      @click="klik"
    />
    <button v-else class="upload-button" @click="klik">
      <svg
        width="24"
        height="32"
        version="1.1"
        viewBox="0 0 24 32"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      >
        <metadata>
          <rdf:RDF>
            <cc:Work rdf:about="">
              <dc:format>image/svg+xml</dc:format>
              <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
              <dc:title />
            </cc:Work>
          </rdf:RDF>
        </metadata>
        <path
          d="m14 8.4996v-8.4996h-12.5c-0.83121 0-1.5 0.66874-1.5 1.5v29c0 0.83121 0.66874 1.5 1.5 1.5h21c0.83121 0 1.5-0.66874 1.5-1.5v-20.499h-8.4996c-0.82498 0-1.5-0.67499-1.5-1.5zm4.0737 13.5h-4.0737v4.9999c0 0.55249-0.44749 0.99995-0.99995 0.99995h-2c-0.55249 0-0.99995-0.44749-0.99995-0.99995v-4.9999h-4.0737c-0.89248 0-1.3381-1.0806-0.70436-1.71l6.0261-5.9811c0.41562-0.41311 1.0869-0.41311 1.5024 0l6.0261 5.9811c0.63436 0.62936 0.18937 1.71-0.70311 1.71zm5.4886-15.438-6.1186-6.1249c-0.28124-0.28124-0.66248-0.43749-1.0625-0.43749h-0.38124v8.0001h8.0001v-0.38124c0-0.39374-0.15624-0.77496-0.43749-1.0562z"
          fill="#666"
          stroke-width=".74998"
        />
      </svg>

      Pilih Gambar
    </button>

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
    label: {
      type: String,
    },
    id: {
      type: String,
      default: '0'
    }
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
      axios.post(`/file/upload`, formData, {
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
<style>
.upload-button {
  border: 2px solid gray;
  padding: 4px;
  background-color: white;
  border-radius: 8px;
}

.upload-button:active,
.upload-button:hover,
.upload-button:focus {
  border: 2px solid green;
  background-color: azure;
}

.upload svg {
  padding: 16px;
}
</style>