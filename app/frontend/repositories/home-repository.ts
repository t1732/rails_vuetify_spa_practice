import Repository from "./graphql-repository"

export default {
  get () {
    return Repository.query(`{
      appInfo {
        systems {
          label
          version
        }
        jsPackages {
          label
          version
        }
      }
    }`)
  }
}
