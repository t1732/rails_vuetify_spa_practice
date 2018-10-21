module Resolvers
  class Books < Resolvers::Base
    MAX_LIMIT = 100

    type [Types::BookType], null: false

    argument :limit, Integer, default_value: 15, required: false,
      prepare: ->(limit, context) { [limit, MAX_LIMIT].min }

    def resolve(limit:)
      ::Book.order(created_at: :desc).limit limit
    end
  end
end
