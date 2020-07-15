class CreateConcerts < ActiveRecord::Migration[6.0]
  def change
    create_table :concerts do |t|
      t.references :venue, null: false, foreign_key: true
      t.string :artist
      t.date :date
      t.time :time
      t.boolean :attended

      t.timestamps
    end
  end
end
