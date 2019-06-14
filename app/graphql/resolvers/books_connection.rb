module Resolvers
  class BooksEdgeType < GraphQL::Types::Relay::BaseEdge
    node_type(Types::BookType)
  end

  class BooksConnectionType < Types::BaseConnection
    edge_type(BooksEdgeType)
  end

  class BooksConnection < Resolvers::Base
    type BooksConnectionType, null: false

    def resolve
      ::Book.order(created_at: :desc)
    end
  end
end
