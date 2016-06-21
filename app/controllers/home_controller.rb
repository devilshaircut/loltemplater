class HomeController < ApplicationController

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

  def champion_list
    @angularController = 'championListController'
  end

  def roadmap
    @angularController = 'baseController'
  end

end
