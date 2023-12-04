<template>
  <div>
    <kapal-patroli class="mb-2" v-if="data" :division="data" />
    <telecomunication-tools class="mb-2" v-if="data" :division="data" />
    <senjata-api class="mb-2" v-if="data" :division="data" />
    <alat-pemindai class="mb-2" v-if="data" :division="data" />
    <others class="mb-2" v-if="data" :division="data" />
  </div>
</template>

<script>
import KapalPatroli from './KapalPatroli.vue'
import TelecomunicationTools from './TelecomunicationTools.vue'
import SenjataApi from './SenjataApi.vue'
import AlatPemindai from './AlatPemindai.vue'
import Others from './Others.vue'
import axios from 'axios'

export default {
  data: () => ({
    data: null
  }),
  components: {
    KapalPatroli,
    TelecomunicationTools,
    SenjataApi,
    AlatPemindai,
    Others,
  },

  head () {
    return { title: 'Sarana Operasi' }
  },

  created () {
    const params = this.$route.params;
    if (params && params.slug) {
      this.getBySlug(params.slug)
    }
  },

  methods: {
    getBySlug (slug) {
      axios.get(`/pub/division/${slug}`).then(res => {
        this.data = res.data.data
      })
    }
  },
  watch: {
    $route (to, from) {
      this.getBySlug(to.params.slug)
    },
  }
}
</script>
