/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

import Vue from 'vue'

Vue.filter('formatDateTime', (value) => {
  const date = new Date(value)
  return date.toLocaleString(['id-ID'], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

Vue.filter('formatDate', (value) => {
  const date = new Date(value)
  return date.toLocaleString(['id-ID'], {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
})

Vue.filter('formatNumber', (amount) => {
  if (!amount) {
    return `0`;
  }
  if (
    amount !== "" ||
    amount !== undefined ||
    amount !== 0 ||
    amount !== "0" ||
    amount !== null
  ) {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } else {
    return `${amount}`
  }
})