import axios from 'axios'

const headers: {[s: string]: string} = {
  'X-Requested-With': 'XMLHttpRequest'
}

export default axios.create({
  /* timeout: 1000,*/
  headers: headers
})
