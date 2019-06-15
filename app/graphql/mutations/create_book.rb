class Mutations::CreateBook < Mutations::BaseMutation
  null false

  argument :title, String, required: true
  argument :author, String, required: false
  argument :publisher, String, required: false
  argument :genre, String, required: false

  field :book, Types::BookType, null: true
  field :errors, [String], null: false

  def resolve(params)
    book = Book.new params
    if book.save
      {
        book: book,
        errors: [],
      }
    else
      {
        user: nil,
        errors: book.errors.full_messages
      }
    end
  end
end
