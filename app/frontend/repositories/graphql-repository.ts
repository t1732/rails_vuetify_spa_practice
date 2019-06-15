import oneline from "oneline"
import paramsToGqlInput from "@/utils/params-to-gql-input.ts"
import Repository from "./repository"

const GRAPHQL_END_POINT: string = "/api/graphql"

export class GraphqlRepository {
  query (query: string) {
    return Repository.post(GRAPHQL_END_POINT, { query: oneline`${query}` })
  }

  getConnectionQuery (target: string, nodeQuery: string, args: {[s: string]: any} = {}): string {
    const argsQuery = paramsToGqlInput(args)
    return `{
      ${target}(${argsQuery}) {
        pageInfo {
          hasNextPage,
          hasPreviousPage,
          startCursor,
          endCursor
        },
        edges {
          node ${nodeQuery}
        }
      }
    }`
  }

  connection (target: string, nodeQuery: string, args: {[s: string]: any} = {}) {
    return Repository.post(GRAPHQL_END_POINT, {
      query: oneline`${this.getConnectionQuery(target, nodeQuery, args)}`
    })
  }

  mutation (query: string) {
    return Repository.post(GRAPHQL_END_POINT, {
      query: oneline`mutation ${query}`
    })
  }
}

export default new GraphqlRepository()
