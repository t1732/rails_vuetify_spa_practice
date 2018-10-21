"use strict"

export default class GraphqlResponse {
  constructor(response) {
    this.response = response
  }
  get data() {
    return this.response.data.data
  }
}
