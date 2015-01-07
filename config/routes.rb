Rails.application.routes.draw do
  get 'sessions/new'

  get 'welcome/index'

  get "logout" => "sessions#destroy"
  get "login" => "sessions#new"
  get "signup" => "users#new"
  # put "approve/:id" => "friendships#approve"
  post "comments" => "comments#create"

  # resources :comments, only: [:show] # do
  #   collection do
  #     post 'flight'
  #     post 'data'
  #   end
  # end

  resources :friendships, only: [:create, :destroy] do
    member do
      post 'approve'
    end
  end
  resources :likes, only: :create
  resources :launches, only: :create

  resources :users do
    get :autocomplete_username, :on => :collection
  end
  resources :sessions

  get "flights/:flight_id/pictures/newtoalbum" => "pictures#newtoalbum"
  post "flights/:flight_id/picturestoalbum" => "pictures#createtoalbum"

  get "flights/feed" => "flights#feed"

  resources :flights do
    collection { post :import }
    resources :data_points
    resources :pictures, except: :show
  end


  resources :charts, only: [:index, :show]

  root 'welcome#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
