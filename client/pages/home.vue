<template>
  <div>
    <home-sbp />
    <hr />
    <home-dash class="mt-4" />
    <hr />
    <home-penerimaan class="mt-3" />
  </div>
</template>
<script>
import HomeSbp from './home_sbp.vue'
import HomeDash from './home_dash.vue'
import HomePenerimaan from './home_penerimaan.vue'
export default {
  components: {
    HomeSbp,
    HomeDash,
    HomePenerimaan,
  }
}
</script>