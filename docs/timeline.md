##About
This guide was used during the app creation process.
## Minimum Viable Product
nycBNB is a clone of airBNB built on Rails and Backbone with a focus on NYC property. Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Post a listing
- [x] View available listings on a map
- [x] Request other people's listings
- [x] Approve requests to rent your listing
- [x] Search for listings by location, price
- [x] Search for listings by available dates

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./views.md
[schema]: ./schema.md

## Implementation Timeline

### Phase 1: User Authentication (~1 day)
I will implement user authentication in Rails using multiple session sign in with a separate session table. By the end of this phase, users will be able to sign up and log in using a simple Rails form. The most important part of this phase will be pushing the app to Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Add a Listing (1-2 days)
I will add forms for creating and editing a listings with API routes to serve
data. Then add Backbone models and collections to fetch the data. Users will
be able to upload photos (through filepicker) to enhance the listing. By the end
of this phase users will be able to create listings and view all posted listings
inside Backbone.

[Details][phase-two]

### Phase 3: Add a Trip (~2 days)
I will add forms for creating trips based on available rooms. Trips cannot
conflict with one another and must be approved by the owner of the room. The
User profile needs a form for viewing trip requests and approving or denying
those requests.

[Details][phase-three]

### Phase 4: Map View (2-3 days)
Listings are shown on a map with markers at the appropriate address. The map
is shown side-by-side with the ListingIndex. GoogleMaps API is used for the map.
Moving the map serves as a location based search for listings.

[Details][phase-four]

### Phase 5: Searching and Sorting Listings(~2 days)
Search for listings based on different criteria - such as location, price, calendar
availability. I'll need to add `search` routes to the listing controller. On the
Backbone side, there will be a `SearchResults` composite view has a `ListingIndex`
and map subviews.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] "Favorite" button to save a listing without making a trip
- [x] Pagination/infinite scroll for listings
- [x] Multiple sessions/session management
- [ ] Review system for leaving comments on a listing
- [ ] Messaging system for owners and renters to correspond

[phase-one]: ./phases/phase1.md
[phase-two]: ./phases/phase2.md
[phase-three]: ./phases/phase3.md
[phase-four]: ./phases/phase4.md
[phase-five]: ./phases/phase5.md
