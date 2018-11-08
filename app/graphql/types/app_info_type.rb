module Types
  class AppInfoType < Types::BaseObject
    description "application infomation"

    field :systems, [Types::AppInfoItemType], null: false
    field :js_packages, [Types::AppInfoItemType], null: false
  end
end
