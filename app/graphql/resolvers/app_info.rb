module Resolvers
  class AppInfo < Resolvers::Base
    type Types::AppInfoType, null: false

    def resolve
      Rails.application.config.app_info
    end
  end
end
