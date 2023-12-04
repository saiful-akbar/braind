<template>
    <label>{{((paginate.current_page - 1) * paginate.per_page) + 1 + index}}</label>
</template>
<script>
export default {
    props: {
      paginate: {
        type: Object,
        default: {
          current_page: 1,
          total_pages: 1
        }
      },
      index: {
        type: Number,
        default: 1
      }
    }
}
</script>