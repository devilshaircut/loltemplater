class CreateChampions < ActiveRecord::Migration
  def change
    create_table :champions do |t|
      t.json :championjson
      t.string :fbsession

      t.timestamps null: false
    end
  end
end
