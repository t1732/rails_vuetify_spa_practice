class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :publisher, :genre
end
