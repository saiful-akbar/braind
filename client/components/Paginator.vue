<template>
  <vs-pagination
    v-if="paginate && paginate.total_entries > 0"
    :total-pages="paginate.total_pages"
    @change="changePage"
  />
</template>
<script>
import VsPagination from '@vuesimple/vs-pagination';

export default {
  name: 'Paginator',
  props: {
    paginate: {
      type: Object,
      default: null
    }
  },
  components: {
    VsPagination,
  },
  methods: {
    changePage (p) {
      this.$emit('changePage', p)
    }
  }
}
</script>