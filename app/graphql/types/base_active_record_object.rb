module Types
  class BaseActiveRecordObject < BaseObject
    field :id, ID, null: false
    field :updated_at, String, null: false
    field :created_at, String, null: false
  end
end
