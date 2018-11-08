module Types
  class AppInfoItemType < Types::BaseObject
    description "application infomation item"

    field :label, String, null: false
    field :version, String, null: false
  end
end
