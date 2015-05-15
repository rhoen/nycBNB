class SetListingActiveDefaultFalse < ActiveRecord::Migration
  def change
    change_column_default :listings, :active, false
  end
end
