Loltemplater::Application.routes.draw do

  root :to => "home#index"

  get   '/sample'                => 'home#sample'
  get   '/tables'                => 'home#tables'
  get   '/warnings'              => 'home#warnings'
  get   '/buttons'               => 'home#buttons'
  get   '/forms'                 => 'home#forms'
  get   '/icons'                 => 'home#icons'
  get   '/edit_champion/:id'     => 'home#edit_champion'
  get   '/view_champion/:id'     => 'home#view_champion'
  get   '/create_champion'       => 'home#create_champion'
  get   '/champion_list'         => 'home#champion_list'
  get   '/published_champions'   => 'home#published_champions'
  get   '/roadmap'               => 'home#roadmap'

  post  '/save_champion'         => 'home#save_champion'
  post  '/get_champion'          => 'home#get_champion'

  # resources :champion do
  #   post "/save_champion"      => "home#save_champion"
  # end

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
