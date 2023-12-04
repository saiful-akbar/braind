<template>
  <div class="row dashboard">
    <card
      :title="`Peta Kerawanan Kepabean - ${
        division && division.name ? division.name : '-'
      }`"
      class="col-md-12"
    >
      <div>
        <span v-for="(v, k) in galleries1.data" :key="k">
          <img :src="v.url" alt="" style="width: 100%" />
          <div class="mt-2">{{ v.description }}</div>
        </span>
      </div>
    </card>
    <card
      :title="`Kerawanan Cukai - ${
        division && division.name ? division.name : '-'
      }`"
      class="col-md-12 mt-2"
    >
      <div class="row">
        <div v-for="(v, k) in galleries2.data" :key="k" class="col-md-6">
          <div class="row mb-4">
            <div class="col-md-5">
              <img :src="v.url" alt="" style="width: 100%" />
            </div>
            <div class="col-md-7">
              <h6>{{ v.title }}</h6>
              <div>{{ v.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import axios from 'axios';
import Paginator from '@/components/Paginator';
export default {
  head () {
    return { title: "Dashboard" }
  },
  components: {
    Paginator
  },

  data: () => ({
    div: null,
    gallery: null,
    galleries1: [],
    galleries2: [],
  }),

  created () {
    const params = this.$route.params
    this.loadDivision(params.slug)
  },

  methods: {
    loadDivision (slug) {
      axios.get(`/pub/division/${slug}`).then(res => {
        this.division = res.data.data;
        this.galleries(this.division, 'dm')
        this.galleries(this.division, 'vm')
      })
    },
    galleries (data, type) {
      axios.get(`/pub/galleries/byslug/${data.slug}?type=${type}`).then(res => {
        if (type == 'vm') {
          this.galleries1 = res.data
        } else {
          this.galleries2 = res.data
        }
      })
      this.gallery1 = null;
      this.gallery2 = null;
    },
  },
  watch: {
    $route (to, from) {
      this.loadDivision(to.params.slug);
    },
  }
}
</script>
