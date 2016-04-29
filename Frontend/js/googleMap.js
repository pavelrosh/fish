var weather = require('./weather')
function initialize() {
//Тут починаємо працювати з картою
    var mapProp = {
        center: new google.maps.LatLng(50.464379, 30.519131),
        zoom: 11
    };
    var marineWeatherInput = {
        query: '53,30',
        format: 'JSON',
        fx: '',
        callback: 'MarineWeatherCallback'
    };
    weather.MarineWeather(marineWeatherInput);
    var html_element = document.getElementById("googleMap");
    var map = new google.maps.Map(html_element, mapProp);
//Карта створена і показана
    var point = new google.maps.LatLng(50.464379, 30.519131);
    var marker = new google.maps.Marker({
        position: point,
        //map - це змінна карти створена за допомогою new google.maps.Map(...)
        map: map
    });

    google.maps.event.addListener(map, 'click', function (me) {
        var coordinates = me.latLng;
        console.log(coordinates);
        //  var marker;

        geocodeLatLng(coordinates, function (err, adress) {
            if (!err) {
                //Дізналися адресу
                //  marker.setMap(null);
                console.log(adress);
                //marineWeatherInput = {
                //    query: me.latLng,
                //    format: 'JSON',
                //    fx: '',
                //    callback: 'MarineWeatherCallback'
                //};
                //weather.MarineWeather(marineWeatherInput);
                $('.current_city').text(adress);
                geocodeAddress(adress, function (err, coordinates) {
                    if (!err) {
                        marker.setPosition(coordinates);
                        console.log(coordinates);

                    }
                });
            } else {
                console.log("Немає адреси")
            }
        })
    });


    function geocodeLatLng(latlng, callback) {
        //Модуль за роботу з адресою
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latlng},
            function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results[1]) {
                    console.log(results);
                    var add = results[0].address_components;
                    var i = 0;
                    while (i < add.length)
                        if (add[i].types[0] !== 'locality')
                            i++;
                    if (i === add.length - 1) {
                        callback(null, results[0].address_components[i - 1].long_name.substring(0, 4));
                    }
                    callback(null, results[0].address_components[i].long_name);
                } else {
                    callback(new Error("Can't find adress"));
                }
            });
    }

    function geocodeAddress(address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK && results[0]) {
                var coordinates = results[0].geometry.location;
                callback(null, coordinates);
            } else {
                callback(new Error("Can not find the address"));
            }
        });
    }


     //перекидує на місцезнаходження користувача

     // Try HTML5 geolocation.
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            marker.setPosition(pos);
            marker.setContent('Location found.');
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
     function handleLocationError(browserHasGeolocation, pos) {
         var infoWindow = new google.maps.InfoWindow({map: map});
         infoWindow.setPosition(pos);
         infoWindow.setContent('Location found.');
         map.setCenter(pos);
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }

}
//Коли сторінка завантажилась
google.maps.event.addDomListener(window, 'load', initialize);
exports.point = marker.position;