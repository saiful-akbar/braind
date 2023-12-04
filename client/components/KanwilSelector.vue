<template>
  <div>
    <select v-model="inputVal" class="form-control" v-if="!readonly">
      <option :value="o" v-for="(o, k) in divisions" :key="k">
        {{ o.name }}
      </option>
    </select>
    <span v-else-if="readonly && inputVal" class="form-control">{{
      inputVal.name
    }}</span>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    value: {
      type: Object,
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      divisions: []
    }
  },
  computed: {
    inputVal: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
      }
    }
  },
  async created () {
    const response = await axios.get(`/pub/division`);
    this.divisions = response.data.data
  },
}
</script>
