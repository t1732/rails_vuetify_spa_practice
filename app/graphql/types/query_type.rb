module Types
  class QueryType < Types::BaseObject
    field :book, description: "Find book by ID", resolver: Resolvers::Book
    field :books, description: "Find all books with pagination", resolver: Resolvers::Books
  end
end
