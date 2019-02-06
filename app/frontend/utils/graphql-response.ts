export default class GraphqlResponse {
  graphqlData: {[s: string]: any}

  constructor (value: {[s: string]: any}) {
    this.graphqlData = value.data
  }

  get data () {
    return this.graphqlData.data
  }
}
