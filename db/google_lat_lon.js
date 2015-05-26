<script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js"
        </script>
<script src="jquery-csv.js"></script>

//$.csv.function(csv, {options}, callback);

var geocoder = new google.maps.Geocoder();
my_str = fs.readFileSync(file, 'utf8')
var address = "598 Broadway";
geocoder.geocode({'address': address}, function( results, status) {
  if (status == google.maps.GeocoderStatus.OK) {
    //fix based on location var
    console.log(results[0].geometry.location[""],
    results[0].geometry.location[""])

  }
}

var fs = require('fs');
var file = "/Users/rhoen/Documents/rollingsales_small.csv";
fs.readFileSync(file, 'utf8', callback)


var $ = jQuery = require('jquery');
require('/Users/rhoen/Documents/jquery.csv-0.71.js');
var objs = [];
var gm = require("googlemaps")
var http = require("http");
var callback = function(obj) {
  gm.geocode(obj.street_address, function(error, results){
    obj.latitude = results[0].geometry.location["lat"];
    obj.longitude = results[0].geometry.location["lng"];
    objs.push(obj);
    console.log("callbacked in an obj");

  })
}


$.csv.toObjects(, {}, callback)
$.csv.toObjects(fs.readFileSync(file), {}, function(obj){console.log(obj);})


// get is a simple wrapper for request()
// which sets the http method to GET
// var getLatLng = function(obj) {
//   var url = gm.geocode(obj.street_address, callback);
//   var callback = function () {
//     http.get(url, function (response) {
//       // data is streamed in chunks from the server
//       // so we have to handle the "data" event
//       var buffer = "",
//           data,
//           route;
//       //
//       response.on("data", function (chunk) {
//           buffer += chunk;
//       });
//       //
//       response.on("end", function (err) {
//           // finished transferring data
//           // dump the raw data
//           // console.log(buffer);
//           // console.log("\n");
//           data = JSON.parse(buffer);
//           var lat = data.results[0].geometry.location["lat"];
//           var lng = data.results[0].geometry.location["lng"];
//           console.log("completed Request");
//           console.log(lat, lng);
//           obj.lat = lat;
//           obj.lng = lng;
//       });
//     });
//   }
// }
