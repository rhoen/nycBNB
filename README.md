# nycBNB [live link](www.nycbnb.us)

##About
nycBNB is a clone of airBNB built on Rails and Backbone with a focus on NYC property.

##How to Use
To explore the site, please log in as Guest with the link on the home page.
When logged in a user is able to browse listings posted by other users, search for those listing by location, available dates, and other parameters (price, # of guests etc.). A user may then create a request that is then subject to approval by the listing owner.

Users can also create their own listings and approve or deny requests from other users to rent those listings. Users can customize the show page for their listings by uploading photos and selecting a primary cover photo.

##Technology
nycBNB is built with a Rails backend and a Backbone front end. jQuery is used for visual effects on the client. On the backend custom SQL queries allow certain operations such as automatically denying requests that overlap on the dates of an approved request (a listing may only be rented to one user at a given time).

The Google Maps API is used for displaying listings based on latitude and longitude, and the Google Maps Geocoder is used to geocode new listings that are created. Geocoding only occurs when a listing is 'activated' by a user. This allows users to create listings and not fill in the full address immediately. They must fill in the full address before they can activate the listing, forcing the record to be properly geocoded. Only activated listings will turn up in search results.

##Implementation
To see the preparation that went into building this app, see the [implementation guidelines](./docs/timeline.md)
