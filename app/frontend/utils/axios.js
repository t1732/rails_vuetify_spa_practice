"use strict"
import axios from 'axios'

const tokenElement = document.querySelector('meta[name=csrf-token]')
export default axios.create({
  /* timeout: 1000,*/
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': (tokenElement) ? tokenElement.content : null
  }
})
