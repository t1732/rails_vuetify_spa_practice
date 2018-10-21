module Resolvers
  class Book < Resolvers::Base
    type Types::BookType, null: false

    argument :id, ID, required: true

    def resolve(id: nil)
      ::Book.find id
    end
  end
end
