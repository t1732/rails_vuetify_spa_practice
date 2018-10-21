module Types
  class BookType < Types::BaseActiveRecordObject
    description "book"

    field :title, String, null: false
    field :author, String, null: true
    field :publisher, String, null: true
    field :genre, String, null: true
  end
end
