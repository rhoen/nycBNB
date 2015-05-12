# Schema Information

## listings
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
owner_id        | integer   | not null, foreign key (references users)
street_address  | string    | not null
city            | string    | not null
state           | string    | not null
zip             | string    | not null
room_type       | string    | not null
guest_limit     | integer   | not null
price_per_night | integer   | not null
description     | string    |

## trips
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
traveler_id | integer   | not null, foreign key (references users)
listing_id  | integer   | not null, foreign key (references listngs)
start_date  | date_time | not null
end_date    | date_time | not null

## favorites
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
listing_id  | string    | not null, foreign key (references listings)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null

## session_tokens
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key (references users)
session_token   | string    | not null, unique
