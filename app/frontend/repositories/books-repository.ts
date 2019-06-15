import Repository from "./graphql-repository"

export default {
  getPages (per: number, cursor: string | undefined) {
    return Repository.connection(
      "booksConnection",
      `{
        id
        title
        author
        publisher
        updatedAt
        createdAt
      }`,
      {
        first: per,
        after: cursor
      })
  }
}
