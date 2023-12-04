<template>
  <div class="layout">
    <navbar />

    <div class="container mt-4">
      <nuxt />
    </div>

  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Footer2 from '~/components/Footer'

export default {
  components: {
    Navbar,
    Footer2
  }
}
</script>
