var map;
var addresses;
// xWrong-> let mapMarkers: MapMarker[];
var mapMarkers = [];
var marker;
// interface implemented
var Toronto = {
    lat: 43,
    lng: -79.38
};
// class for map markers
var MapMarker = /** @class */ (function () {
    function MapMarker(address) {
        this.Address = address;
    }
    ;
    return MapMarker;
}());
$.ajax({
    url: './AClocation.json',
    dataType: 'json',
    success: function (data) {
        // console.log(data);
        // for (let i of data){
        //     console.log(i.address);
        // }
        addresses = data;
        for (var _i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
            var i = addresses_1[_i];
            // console.log(i.address);
            // add map marker to array of map markers
            var newMapMarker = new MapMarker(i.address);
            mapMarkers.push(newMapMarker);
        }
    }
});
function initMap() {
    var geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 8
    });
    //     marker = new google.maps.Marker({
    //         position: Toronto,
    //       map: map
    //    });
    var mapMarkerIndex = 0;
    setTimeout(addMarker, 300);
    function addMarker(latLngOfAddress) {
        if (mapMarkerIndex < 11) {
            mapMarkers[mapMarkerIndex].LatLng = getLatLng(mapMarkers[mapMarkerIndex].Address + " Toronto, Canada");
            // console.log(mapMarkers[mapMarkerIndex]);
            // this returning inital value (hamilton)
            // console.log(mapMarkers[mapMarkerIndex].LatLng);
            var marker_1 = new google.maps.Marker({
                position: latLngOfAddress,
                //position: Toronto,
                map: map
            });
            marker_1.setMap(map);
            mapMarkerIndex++;
            setTimeout(addMarker, 500);
        }
    }
    // Begin get LatLng
    // get address as a param and return LatLng obj
    function getLatLng(address) {
        // initial value = hamiltom
        var resultLatLng = { lat: 43.2557, lng: -79.8711 };
        // using getcorder.getcode(obj, function)
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == "OK") {
                resultLatLng.lat = results[0].geometry.location.lat();
                resultLatLng.lng = results[0].geometry.location.lng();
            }
            addMarker(resultLatLng);
        });
        // this return is executed before the callback function above
        // return resultLatLng;
    }
    // function getFirstTen(){
    //     let latlng:LatLng = {lat: 0, lng:0};
    //     for (let i = 0; i < 10; i++) {
    //         console.log("mapMarkers in initMap");
    //         latlng = getLatLng(mapMarkers[i].Address);
    //         console.log(latlng);
    //     }
    //     return latlng;
    // }
}
// initMap();
