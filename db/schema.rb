# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150519013542) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.integer  "owner_id",                           null: false
    t.string   "street_address"
    t.string   "city",                               null: false
    t.string   "state"
    t.string   "zip"
    t.decimal  "latitude"
    t.decimal  "longitude"
    t.string   "room_type",                          null: false
    t.integer  "guest_limit",                        null: false
    t.string   "price_per_night"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.string   "home_type"
    t.boolean  "active",             default: false
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "listings", ["city"], name: "index_listings_on_city", using: :btree
  add_index "listings", ["latitude"], name: "index_listings_on_latitude", using: :btree
  add_index "listings", ["longitude"], name: "index_listings_on_longitude", using: :btree
  add_index "listings", ["price_per_night"], name: "index_listings_on_price_per_night", using: :btree
  add_index "listings", ["room_type"], name: "index_listings_on_room_type", using: :btree
  add_index "listings", ["state"], name: "index_listings_on_state", using: :btree
  add_index "listings", ["street_address"], name: "index_listings_on_street_address", using: :btree
  add_index "listings", ["zip"], name: "index_listings_on_zip", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.integer "user_id"
    t.string  "session_token"
  end

  add_index "sessions", ["session_token"], name: "index_sessions_on_session_token", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",               null: false
    t.string   "password_digest",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
