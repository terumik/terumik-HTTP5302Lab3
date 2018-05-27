let map: any;
let addresses: any[];
// xWrong-> let mapMarkers: MapMarker[];
let mapMarkers: MapMarker[] = [];
let marker:any;
// let getFirstTen:any;


// interface
interface LatLng{
    lat: number,
    lng: number
}

// interface implemented
let Toronto : LatLng = {
    lat: 43,
    lng: -79.38
};

// class for map markers
class MapMarker{
    Address: string;
    LatLng: LatLng;

    public constructor(
      address:string
    ){
        this.Address = address;
    };
}


$.ajax({
    url:'./AClocation.json',
    dataType: 'json',
    success: function(data){
        // console.log(data);
        // for (let i of data){
        //     console.log(i.address);
        // }
        
        addresses = data;
        for (let i of addresses){
            // console.log(i.address);

            // add map marker to array of map markers
            let newMapMarker: MapMarker = new MapMarker(i.address);
            
            mapMarkers.push(newMapMarker);
            // getFirstTen();
        }

    }
});


function initMap() {
    let geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(
        document.getElementById('map'), {
        center: Toronto,
        zoom: 8
    });
    
//     marker = new google.maps.Marker({
//         position: Toronto,
//       map: map
//    });

    let mapMarkerIndex: number = 0;
    setTimeout(addMarker, 300);

    function addMarker(latLngOfAddress):void{

        if(mapMarkerIndex < 11){
            mapMarkers[mapMarkerIndex].LatLng = getLatLng(
                mapMarkers[mapMarkerIndex].Address + " Toronto, Canada",
            );
            // console.log(mapMarkers[mapMarkerIndex]);
            // this returning inital value (hamilton)
            // console.log(mapMarkers[mapMarkerIndex].LatLng);

            let marker = new google.maps.Marker(
                {
                    position: latLngOfAddress,
                    //position: Toronto,
                    map:map
                }
            );
            

            marker.setMap(map);
            mapMarkerIndex++;
            setTimeout(addMarker, 500);

        }
    }


    // Begin get LatLng
    // get address as a param and return LatLng obj
    function getLatLng(address:string):LatLng{
        // initial value = hamiltom
        let resultLatLng:LatLng = {lat:43.2557, lng:-79.8711};
        
        // using getcorder.getcode(obj, function)
        geocoder.geocode({
            'address': address
        },
        function(results, status){
            
            if(status=="OK"){
                resultLatLng.lat= results[0].geometry.location.lat();
                resultLatLng.lng= results[0].geometry.location.lng();   
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