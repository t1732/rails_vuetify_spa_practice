import Repository from "./graphql-repository"
import paramsToGqlInput from '@/utils/params-to-gql-input'

export default {
  getPages (per: number, cursor: string | undefined) {
    return Repository.connection(
      "booksConnection",
      this._getBookFieldsQuery(),
      {
        first: per,
        after: cursor
      })
  },

  create (params: {[s: string]: string}) {
    const input = paramsToGqlInput(params)
    return Repository.mutation(`{
      createBook(input: { ${input} }) {
        book ${this._getBookFieldsQuery()}
        errors
      }
    }`)
  },

  _getBookFieldsQuery (): string {
    return `{
      id
      title
      author
      publisher
      updatedAt
      createdAt
    }`
  }
}
