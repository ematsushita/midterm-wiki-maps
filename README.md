# Bucket.map()

![bucket.map() logo](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/bucket_logo.png)

## Bucket Lists for your Life!

Bucket.map() is a small web app to allow users to view, create, edit, and save collections of points on a map.

Users can curate collections of places of interest, favourite restaurants, or other attractions. These lits are public and accessible to other users.

## Features

### View Available Lists

Unauthenticated users can view all curated lists from the front page. Lists can be clicked to reveal descriptions of each.

![Viewing Lists](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/list_dropdown.gif)

### Authenticated User Lists and Favouriting

Authenticated users can see lists they've created, contributed too, or favourites. Favourites can be easily added or removed from the main page.

![Authenticated View Lists](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/authenticated_lists.gif)

### Creating new Maps

Authenticated Users can create new maps easily with just a title and a description. The page auto-redirects to the map view page where new points can be added.

![Creating new maps](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/new_map.gif)

### Google AutoComplete

Locations can be searched easily in the autocomplete field, which leverages the Google Places Library to access millions of landmarks, business, and points of interest across the world.

![Using Google Places AutoComplete](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/autocomplete.gif)

### Adding Google Places to the map

With two clicks, any Google Place can be added to your curated map. 

The fields in the new point form are completely adjustable by the user, but will auto populate with latitude, longitude, title, description, and a picture from Google. This allows users to very quickly add new points.

![Add Point](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/add_point.gif)

### Adding Custom Markers to the map

Know a special place so secret it's not on Google? No problem! Click anywhere on the map to place a custom marker. Click it again when it's just right, and it's latitude and longitude will be automatically added to the add point field.

![Add Point](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/click-point.gif)

### Displaying Points

Bucket.map() dynamically shows all your points on the map intuitively by centring the map in the geographical centre of your collection and adjusting the zoom to fit all points.

![Display Points](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/display_points.png)

All points are displayed below the map using a responsive card column design for a rich multimedia experience.

![Card Columns](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/cardcolumns.gif)

### Editing and Deleting Points

Points can be edited inline through their card columns. The map mage is instantly refreshed with the new data.

![Edit Points](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/edit_point.gif)

With a simple click, they can be removed from the list as well.

![Delete Points](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/delete_point.gif)

### Info Windows

All the data from the collections are also accessible through the map view by clicking on the points to load their corresponding info windows.

![Info Windows](https://github.com/ematsushita/midterm-wiki-maps/blob/master/docs/info_window.gif)


## Package Dependencies

- node
- npm
- pg
- pg-native
- body-parser
- chalk
- cookie-session
- dotenv
- ejs
- express
- morgan
- node-sass-middleware
