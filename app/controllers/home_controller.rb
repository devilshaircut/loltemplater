class HomeController < ApplicationController

  skip_before_action :verify_authenticity_token, only: [:save_champion, :get_champion, :get_all_champions]

  def index
    @angularController = 'baseController'
  end

  def sample
    @angularController = 'baseController'
  end

  def tables
    @angularController = 'tablesController'
  end

  def warnings
    @angularController = 'warningsController'
  end

  def buttons
    @angularController = 'baseController'
  end

  def forms
    @angularController = 'baseController'
  end

  def icons
    @angularController = 'baseController'
  end

  def edit_champion
    @angularController = 'editChampionController'
  end

  def view_champion
    @angularController = 'editChampionController'
  end

  def create_champion
    @angularController = 'editChampionController'
  end

  def published_champions
    @angularController = 'publishedChampionsController'
  end

  def edit_published_champion
    @angularController = 'editChampionController'
  end

  def save_champion
    if params[:fbSession]
      id = params[:fbSession][:id]
      json = params[:champion].to_json()
      # Rails.logger.debug(params.to_json())
      # Rails.logger.debug("-----")
      # Rails.logger.debug(id)
      Rails.logger.debug(json)
      # Rails.logger.debug("-----")
      champion = Champion.create(fbsession: id, championjson: json)

      saveResponse = {
        data: { championKey: champion.id },
        success: true,
        status: 200
      }
      render json: saveResponse
    else
      saveResponse = {
        data: { message: "You must be logged into Facebook to publish your champion." },
        success: false,
        status: 400
      }
      render json: saveResponse
    end
  end

  def get_all_champions

    ownedChampions = []
    if params[:fbSession]
      ownedChampions = Champion.where(fbsession: params[:fbSession])
      unownedChampions = Champion.where.not(fbsession: params[:fbSession])
    else
      unownedChampions = Champion.all
    end

    unownedChampions.each do |p|
      p.fbsession = nil
    end
    ownedChampions.each do |p|
      p.fbsession = nil
    end

    championResponse = {
      data: {
        ownedChampions: ownedChampions,
        unownedChampions: unownedChampions
      },
      success: true,
      status: 200
    }
    championResponse = championResponse.to_json()



    # render json: 
    render json: championResponse
  end

  def get_champion
    Rails.logger.debug(params[:id])

    championResponse = {
      data: Champion.find(params[:id])[:championjson],
      success: true,
      status: 200
    }
    championResponse = championResponse.to_json()

    # render json: 
    render json: championResponse

  end

  def champion_list
    @angularController = 'championListController'
  end

  def roadmap
    @angularController = 'baseController'
  end

end
