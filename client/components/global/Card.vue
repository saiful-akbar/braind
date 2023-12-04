<template>
  <div class="card">
    <div v-if="title" class="card-header">
      <strong>{{ title }}</strong>
      <router-link
        v-if="routeName"
        :to="{ name: routeName }"
        class="btn btn-success add-item"
      >
        Tambah
      </router-link>
    </div>

    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: { type: String, default: null },
    routeName: { type: String, default: null }
  }
}
</script>

<style>
.add-item {
  float: right;
  font-size: 14px;
  padding: 0 6px;
}
</style>
