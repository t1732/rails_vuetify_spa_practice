import BooksRepository from "./books-repository"
import HomeRepository from "./home-repository"

const repositories: {[s: string]: Object} = {
  books: BooksRepository,
  home: HomeRepository
}

export default {
  get: (name: string): Object => repositories[name]
}
