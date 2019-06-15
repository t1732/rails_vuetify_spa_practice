import dig from "object-dig"

class Element {
  pageInfo: {[s: string]: string | number}
  totalCount: number = 0
  items: {[s: string]: any}[]

  constructor (data: {[s: string]: any}) {
    this.pageInfo = data.pageInfo
    this.totalCount = data.totalCount
    this.items = data.edges.map((e: {[s: string]: {[s: string]: any}[]})=> e.node)
  }
}

export default class GraphqlResponse {
  response: {[s: string]: any}

  constructor (response: {[s: string]: any}) {
    this.response = response
  }

  get data (): {[s: string]: any} {
    return this.response.data.data
  }

  getElement (...nodeNames: string[]): Element {
    const data = dig(this.data, ...nodeNames)
    return new Element(data)
  }

  getMutationData (mutaionName: string): any {
    return this.data[mutaionName]
  }
}
