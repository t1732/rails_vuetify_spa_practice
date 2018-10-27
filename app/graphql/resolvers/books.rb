module Resolvers
  class Books < Resolvers::Base
    MAX_LIMIT = 100

    type Types::BookType.connection_type, null: false

    def resolve
      ::Book.order(created_at: :desc)
    end
  end
end
