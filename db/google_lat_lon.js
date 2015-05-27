//create vars
var gm = require("googlemaps")
var fs = require('fs');
var file = "/Users/rhoen/Documents/rollingsales_csv.csv";
var objs = [];
var store;
var csv = require('csv');
var parse = csv.parse;
var stringify = csv.stringify;
var str;
var i = 0;

// 1
//creates readStream and parses into Store. Creates an array of objs,
//happens asynchronously
rs = fs.createReadStream(file);
parser = parse({columns: true}, function(err, data){

  console.log(data);
  store = data;
})
rs.pipe(parser);


// 2
//iterates over the objs and fetches the lat/lng data, placing into array

var coded = [];
var getLatLng = function(store) {
  var makeApiCall = function(index) {
    if (index >= store.length){
      return
    }
    var obj = store[index];
    gm.geocode("" + obj.street_address + obj.city, function(err, data){
      if (err) {
        console.log(err);
      } else {
        obj.latitude = data.results[0].geometry.location["lat"];
        obj.longitude = data.results[0].geometry.location["lng"];
        coded.push(obj);
        console.log("geocoded address #" + i);
        i++;
        //should add to file.
      }
    });
    setTimeout(function() {
      makeApiCall(++index);
    }, 220);
  };
  makeApiCall(0);
};

getLatLng(store);
//this doesn't wait to make the calls
// store.forEach(waitFunc, )
//   function(obj){
//   gm.geocode("" + obj.street_address + obj.city, function(err, data){
//     if (err) {
//       console.log(err);
//     } else {
//       obj.latitude = data.results[0].geometry.location["lat"];
//       obj.longitude = data.results[0].geometry.location["lng"];
//       coded.push(obj);
//       console.log("geocoded address #" + i);
//       i++;
//       //should add to file.
//     }
//   })
// })


// 3
//trun obj back into a string
stringify(store, function(err, output){str = output})


// 4
//write the str to a file
fs.writeFile("my_file.csv", str)











//the below is useless and reprsents much wasted time...

function rotator(arr) {
    var iterator = function (index) {
        if (index >= arr.length) {
            index = 0;
        }
        console.log(arr[index]);
        setTimeout(function () {
            iterator(++index);
        }, 250);
    };

    iterator(0);
};

rotator(["rotatorA", "rotatorB", "rotatorC"]);


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
my_str = fs.readFileSync(file, 'utf8');
fs.readFileSync(file, 'utf8', callback)




csv.parse(my_str, function(err, data){
  csv.stringify(data, function(err, data){
    process.stdout.write(data);
  });
});

var $ = jQuery = require('jquery');
require('/Users/rhoen/Documents/jquery.csv-0.71.js');


var callback = function(obj) {
  gm.geocode(obj.street_address, function(error, results){
    obj.latitude = results[0].geometry.location["lat"];
    obj.longitude = results[0].geometry.location["lng"];
    objs.push(obj);
    console.log("callbacked in an obj");

  })
}


//read lines -- unstable library
var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
    console.log(line);
});
//

var http = require("http");
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
