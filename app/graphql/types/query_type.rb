module Types
  class QueryType < Types::BaseObject
    field :app_info, description: "Application infomation.", resolver: Resolvers::AppInfo
    field :book, description: "Find book by ID", resolver: Resolvers::Book
    field :books_connection,
      description: "Find all books with pagination",
      resolver: Resolvers::BooksConnection
  end
end
