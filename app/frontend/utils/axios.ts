import axios from 'axios'

const tokenElement: HTMLMetaElement = <HTMLMetaElement>document.querySelector('meta[name=csrf-token]')
let headers: {[s: string]: string} = { 'X-Requested-With': 'XMLHttpRequest' }
if (tokenElement) headers['X-CSRF-TOKEN'] = tokenElement.content

export default axios.create({
  /* timeout: 1000,*/
  headers: headers
})
