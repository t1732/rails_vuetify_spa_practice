'use strict'

export default class PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  endCursor: string

  constructor () {
    this.startCursor = ""
    this.endCursor = ""
  }
}
