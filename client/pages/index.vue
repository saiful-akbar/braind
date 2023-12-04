<template>
  <router-view />
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
