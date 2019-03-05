Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    post '/graphql', to: 'graphql#execute'
    if Rails.env.development?
      mount GraphiQL::Rails::Engine, at: "/gpi", graphql_path: "/api/graphql"
    end
  end
end
