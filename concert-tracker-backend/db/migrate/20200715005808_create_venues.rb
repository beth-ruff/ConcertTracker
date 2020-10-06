class CreateVenues < ActiveRecord::Migration[6.0]
  def change
    create_table :venues do |t|
      t.string :name
      t.string :address
      t.string :address2
      t.string :city
      t.string :state
      t.integer :zip
      t.integer :phone_number

      t.timestamps
    end
  end
end
