(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var API_URL = "http://localhost:5050";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        fail: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        fail: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

},{}],2:[function(require,module,exports){

var ejs = require('ejs');


exports.Table = ejs.compile("<tr class=\"today colortext table_act\">\r\n    <td class=\"wday\">\r\n        <p><span class=\"date \">28.04</span></p></td>\r\n    <td class=\"wclouds\">\r\n        <p class=\"clouds_block\"><img src=\"styles/images/sun.png\" class=\"weather\">\r\n            <span class=\"clouds clouds0 \" style=\"display:none;\">Ясно</span>\r\n            <span class=\"clouds clouds1 \" style=\"display:none;\">Хмарно з проясненнями</span>\r\n            <span class=\"clouds clouds2 \" style=\"display:none;\">Хмарно</span>\r\n            <span class=\"clouds clouds3 \" style=\"display:none;\">Пасмурно</span>\r\n            <span class=\"clouds clouds4 \" style=\"display:none;\">Легкий дощ</span>\r\n            <span class=\"clouds clouds5 \" style=\"display:none;\">Дощ</span>\r\n            <span class=\"clouds clouds6 \" style=\"display:none;\">Гроза</span>\r\n            <span class=\"clouds clouds7 \" style=\"display:none;\">Град</span>\r\n            <span class=\"clouds clouds8 \" style=\"display:none;\">Дощ зі снігом</span>\r\n            <span class=\"clouds clouds9 \" style=\"display:none;\">Сніг</span>\r\n            <span class=\"clouds clouds10 \" style=\"display:none;\">Хуртелиця</span>\r\n        </p>\r\n    </td>\r\n    <td class=\"wpreasure\">\r\n        <p class=\"preasure \">746&nbsp;мм.<br> рт. ст.</p>\r\n    </td>\r\n    <td class=\"wwind\">\r\n        <p class=\"wind_direction\"><img src=\"styles/images/wind.png\" class=\"weather\">\r\n            <span class=\"wind_direction0 \" style=\"display:none;\">Пн</span>\r\n            <span class=\"wind_direction1 \" style=\"display:none;\">ПнЗ</span>\r\n            <span class=\"wind_direction2 \" style=\"display:none;\">З</span>\r\n            <span class=\"wind_direction3 \" style=\"display:none;\">ПдЗ</span>\r\n            <span class=\"wind_direction4 \" style=\"display:none;\">Пд</span>\r\n            <span class=\"wind_direction5 \" style=\"display:none;\">ПдС</span>\r\n            <span class=\"wind_direction6 \" style=\"display:none;\">С</span>\r\n            <span class=\"wind_direction7 \" style=\"display:none;\">ПнС</span>\r\n            <span class=\"wind_direction8 \" style=\"display:none;\">Ш</span>\r\n        </p>\r\n    </td>\r\n\r\n    <td class=\"wmoon\"><img src=\"styles/images/moon.png\" class=\"weather\">\r\n\r\n        <div class=\"moon_phase \">2д</div>\r\n    </td>\r\n    <td class=\"wresult\">\r\n        <div><span class=\"result \">75/100</span></div>\r\n    </td>\r\n\r\n</tr>");
},{"ejs":12}],3:[function(require,module,exports){
var carp = require('./carp_activity');
var karas = require('./karas_activity');
var perch = require('./perch_activity');
var pike = require('./pike_activity');
var plotva = require('./plotva_activity');

//for calm fish (peace)
function activity_wind(degree,speed){
    var a;

    if(speed==1)                var slow=true;
    else if(speed>=2&&speed<=8) var middle=true;
    else                        var fast=true;
//N
    if((degree>=0&&degree<=20)&&slow)        a=2;
    else if((degree>=0&&degree<=20)&&middle) a=1;
    else if((degree>=0&&degree<=20)&&fast)   a=0;
//E
    else if((degree>=70&&degree<=110)&&slow) a=3;
    else if((degree>=70&&degree<=110)&&middle)a=2;
    else if((degree>=70&&degree<=110)&&fast)  a=1;
//NNE,NE
    else if((degree>=20&&degree<=55)&&slow)   a=3;
    else if((degree>=20&&degree<=55)&&middle) a=2;
    else if((degree>=20&&degree<=55)&&fast)   a=1;
//ENE
    else if((degree>=55&&degree<=70)&&slow)   a=3;
    else if((degree>=55&&degree<=70)&&middle) a=3;
    else if((degree>=55&&degree<=70)&&fast)   a=2;
//S
    else if((degree>=160&&degree<=200)&&slow)  a=7;
    else if((degree>=160&&degree<=200)&&middle)a=5;
    else if((degree>=160&&degree<=200)&&fast)  a=4;
//SSE,SE,ESE
    else if((degree>=110&&degree<=160)&&slow)  a=5;
    else if((degree>=160&&degree<=200)&&middle)a=4;
    else if((degree>=160&&degree<=200)&&fast)  a=3;
//W
    else if((degree>=250&&degree<=290)&&slow)  a=9;
    else if((degree>=250&&degree<=290)&&middle)a=7;
    else if((degree>=250&&degree<=290)&&fast)  a=5;

//SSW,SW,WSW
    else if((degree>=200&&degree<=250)&&slow)  a=8;
    else if((degree>=200&&degree<=250)&&middle)a=6;
    else if((degree>=200&&degree<=250)&&fast)  a=4;
//WNW,NW,NNW
    else if((degree>=290&&degree<=340)&&slow)  a=6;
    else if((degree>=290&&degree<=340)&&middle)a=4;
    else if((degree>=290&&degree<=340)&&fast)  a=1;

    return a;
}
function Some_func(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var a =0;
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - 1 - i; j++) {
            if (arr[j + 1] < arr[j]) {
                var t = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = t;
            }
        }
    }
//return arr;
    function f1() {
        var deff = Math.abs(arr[3] - arr[0]);

        if (deff >= 0 && deff <= 2) {
            a = 10;
        }

        return a;
    }
    return f1();
}
//----------------------------------------------------------------—
function some_func2(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var deff1 = arr[0] - arr[3];
    var a=0;
    if (deff1 == 3 || deff1 == 4) {
        a = 9;
    } else if (deff1 == 5) {
        a = 8;
    } else if (deff1 < 0 && deff1 >= -3) {
        a = 7;
    } else if (deff1 < -3 && deff1 >= -8) {
        a = 6;
    } else if (deff1 < -8 && deff1 >= -13) {
        a = 5;
    } else if (deff1 < -13 && deff1 >= -18) {
        a = 4;
    } else if (deff1 < -18 && deff1 >= -23) {
        a = 3;
    } else if (deff1 < -23 && deff1 >= -28) {
        a = 2;
    } else if (deff1 < -28 && deff1 >= -33) {
        a = 1;
    } else if (deff1 < -33 && deff1 >= -45) {
        a = 0;
    } else if (deff1 > 5 && deff1 <= 10) {
        a = 7;
    } else if (deff1 > 10 && deff1 <= 15) {
        a = 6;
    } else if (deff1 > 15 && deff1 <= 20) {
        a = 5;
    } else if (deff1 > 20 && deff1 <= 25) {
        a = 4;
    } else if (deff1 > 25 && deff1 <= 29) {
        a = 3;
    } else if (deff1 > 29 && deff1 <= 34) {
        a = 2;
    } else if (deff1 > 34 && deff1 <= 39) {
        a = 1;
    } else if (deff1 > 39 && deff1 <= 45) {
        a = 0;
    }

    return a;

}

function pressure_activity(t1, t2, t3, t4){
    if (Some_func(t1, t2, t3, t4)==0) {
        return some_func2(t1, t2, t3, t4);
    }
    else {
        return Some_func(t1, t2, t3, t4);
    }
}
function activity_water(t) {
 var a = 0;
 if ((t > 0 && t <= 3) || (t > 27 && t < 30)) {
 a = 0;
 } else if ((t >= 4 && t <= 6) || (t == 27)) {
 a = 1;
 } else if ((t >= 7 && t <= 9) || (t == 26)) {
 a = 2;
 } else if ((t == 10) || (t == 25)) {
 a = 3;
 } else if ((t == 11) || (t == 24)) {
 a = 4;
 } else if ((t == 12) || (t == 23)) {
 a = 5;
 } else if ((t == 13) || (t == 22)) {
 a = 6;
 } else if ((t == 14) || (t == 21)) {
 a = 7;
 } else if (t >= 15 && t <= 16) {
 a = 8;
 } else if (t >= 17 && t <= 18) {
 a = 9;
 } else if (t >= 19 && t <= 20) {
 a = 10;
 }
 return a;
}

function activity_moon(md) {
    var a = 0;
    if (md == 1 || md == 29) {
        a = 0;
    } else if (md == 2 || (md >= 12 && md <= 16) || md == 28) {
        a = Math.floor(Math.random() * (3)) + 1;
    } else if (md >= 26 && md <= 27) {
        a = 4;
    } else if (md == 11 || md == 17 || (md >= 23 && md <= 25)) {
        a = 5;
    } else if (md == 3 || md == 18 || md == 9 || md == 10) {
        a = Math.floor(Math.random() * ( 3)) + 6;
    } else if (md >= 20 && md <= 22) {
        a = 9;
    } else {
        a = 10;
    }
    return a;
}
var w = require('./weather');
exports.average = function(node, mw){
    var fishId = $(".dropdownMenu1").find("a").attr("class");
    if(fishId==="carp")
       return  carp.carp_average(node, mw);
    else if (fishId === "karas")
    return karas.karas_average(node, mw);
    else if(fishId === "pike")
    return pike.pike_average(node, mw);
    else if(fishId === "perch")
    return perch.perch_average(node, mw);
    else if (fishId==="plotva")
    return plotva.plotva_average(node, mw);
    return (activity_moon(w.moon_calc())+activity_water(mw.waterTemp_C)
        +activity_wind(mw.hourly[Math.floor((new Date()).getHours()/8)].winddirDegree, mw.hourly[Math.floor((new Date()).getHours()/8)].windspeedKmph)
        +pressure_activity(mw.hourly[0].pressure,mw.hourly[2].pressure,mw.hourly[4].pressure,mw.hourly[6].pressure))/4;
};
},{"./carp_activity":4,"./karas_activity":6,"./perch_activity":8,"./pike_activity":9,"./plotva_activity":10,"./weather":11}],4:[function(require,module,exports){
function carp_activity_cloud(k) {
    var a;
    if (k >=0&&k<10) {
        a = 5;
    }else if (k >=10 && k < 20) {
        a = 6;
    } else if (k >= 20 && k<30) {
        a = 7;
    } else if (k >= 30 &&k<36) {
        a = 10;
    } else if (k >= 36 && k < 40) {
        a = 9;
    } else if (k >= 40 && k < 50) {
        a = 4;
    } else if (k >= 50 && k < 60) {
        a = 3;
    } else if (k >= 60 && k < 80) {
        a = 2;
    } else if (k >= 80 && k < 90) {
        a = 1;
    }else if (k >= 90 && k <= 100) {
        a = 2;
    } else{
        a = 3;
    }
    return a;
}
//
//console.log(activity_cloud(95));
//--------------------------------------------------------------------------------------—

function carp_activity_wind(speed){
    var a;

    if(speed==1){
        a = Math.floor(Math.random() * (3)) + 1;
    }
    else if(speed>=2&&speed<=8){
        a = Math.floor(Math.random() * (4)) + 6;
    }
    else {
        a = Math.floor(Math.random() * (1)) + 4;
    }

    return a;
}
//-----------------------------------------------------------------—
//PRESSURE(today)
function carp_Some_func(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var a =0;
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - 1 - i; j++) {
            if (arr[j + 1] < arr[j]) {
                var t = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = t;
            }
        }
    }
//return arr;
    function f1() {
        var deff = Math.abs(arr[3] - arr[0]);

        if (deff >= 0 && deff <= 2) {
            a = 10;
        }

        return a;
    }
    return f1();
}
function carp_some_func2(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var deff1 = arr[0] - arr[3];
    var a = 0;
    if (deff1 == 3 || deff1 == 4) {
        a = 9;
    } else if (deff1 == 5) {
        a = 8;
    } else if (deff1 < 0 && deff1 >= -3) {
        a = 10;
    } else if (deff1 < -3 && deff1 >= -8) {
        a = 9;
    } else if (deff1 < -8 && deff1 >= -13) {
        a = 8;
    } else if (deff1 < -13 && deff1 >= -18) {
        a = 7;
    } else if (deff1 < -18 && deff1 >= -23) {
        a = 6;
    } else if (deff1 < -23 && deff1 >= -28) {
        a = 5;
    } else if (deff1 < -28 && deff1 >= -33) {
        a = 1;
    } else if (deff1 < -33 && deff1 >= -45) {
        a = 0;
    } else if (deff1 > 5 && deff1 <= 45) {
        a = 1;
    }
    return a;

}

function carp_pressure_activity(){
    if (carp_Some_func(t1, t2, t3, t4)==0) {
        return carp_some_func2(t1, t2, t3, t4);
    }
    else {
        return carp_Some_func(t1, t2, t3, t4);
    }

}

//----------------------------------------------------------------—
//WATER TEMPERATURE

function carp_activity_water(t) {
    var a = 0;
    if ((t > 0 && t <= 3) || (t > 27 && t < 30)) {
        a = 0;
    } else if (t >= 4 && t <= 6) {
        a = 1;
    } else if (t >= 7 && t <= 9) {
        a = 2;
    } else if (t == 10) {
        a = 3;
    } else if (t == 11) {
        a = 4;
    } else if (t == 12) {
        a = 5;
    } else if (t == 13) {
        a = 6;
    } else if ((t >=14)&&(t <= 21)) {
        a = 7;
    } else if (t >= 21 && t <= 23) {
        a = 8;
    } else if (t >= 24 && t <= 27) {
        a = 10;
    } else if (t >= 28 && t <=30) {
        a = 9;
    }
    return a;
}
//--------------------------------------------------------------------------------------—
//MOON SIDE

function carp_activity_moon(md) {
    var a = 0;
    if (md == 1 || md == 29) {
        a = 0;
    } else if (md == 2 || (md >= 12 && md <= 16) || md == 28) {
        a = Math.floor(Math.random() * (3)) + 1;
    } else if (md >= 26 && md <= 27) {
        a = 4;
    } else if (md == 11 || md == 17 || (md >= 23 && md <= 25)) {
        a = 5;
    } else if (md == 3 || md == 18 || md == 9 || md == 10) {
        a = Math.floor(Math.random() * ( 3)) + 6;
    } else if (md >= 20 && md <= 22) {
        a = 9;
    } else {
        a = 10;
    }
    return a;
}
var w = require('./weather');
exports.carp_average = function(node, mw){
    return (carp_activity_moon(w.moon_calc())+carp_activity_water(mw.waterTemp_C)+carp_activity_cloud(mw.hourly[Math.floor((new Date()).getHours()/8)].cloudcover)
        +carp_activity_wind(mw.hourly[Math.floor((new Date()).getHours()/8)].winddirDegree, mw.hourly[Math.floor((new Date()).getHours()/8)].windspeedKmph)
        +carp_pressure_activity(mw.hourly[0].pressure,mw.hourly[2].pressure,mw.hourly[4].pressure,mw.hourly[6].pressure))/5;


};
},{"./weather":11}],5:[function(require,module,exports){
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
},{"./weather":11}],6:[function(require,module,exports){
function karas_activity_cloud(k) {
    var a;
    if (k >= 0 && k < 10) {
        a = 9;
    } else if (k >= 10 && k < 20) {
        a = 7;
    } else if (k >= 20 && k < 27) {
        a = 8;
    } else if (k >= 27 && k < 30) {
        a = 9;
    } else if (k >= 30 && k < 36) {
        a = 10;
    } else if (k >= 36 && k < 40) {
        a = 5;
    } else if (k >= 40 && k < 50) {
        a = 4;
    } else if (k >= 50 && k < 60) {
        a = 1;
    } else if (k >= 60 && k < 80) {
        a = 0;
    } else if (k >= 80 && k < 90) {
        a = 1;
    } else if (k >= 90 && k <= 100) {
        a = 2;
    } else {
        a = 3;
    }
    return a;
}
//
//console.log(activity_cloud(95));
//--------------------------------------------------------------------------------------—

function karas_activity_wind(degree, speed) {
    var a;

    if (speed == 1) {
        var slow = true;
    }
    else if (speed >= 2 && speed <= 8) {
        var middle = true;
    }
    else {
        var fast = true;
    }

//N
    if ((degree >= 0 && degree <= 20) && (slow)) {
        a = 2;
    } else if ((degree >= 0 && degree <= 20) && (middle)) {
        a = 1;
    } else if ((degree >= 0 && degree <= 20) && (fast)) {
        a = 0;
//E
    } else if ((degree >= 70 && degree <= 110) && (slow)) {
        a = 3;
    }
    else if ((degree >= 70 && degree <= 110) && (middle)) {
        a = 2;
    }
    else if ((degree >= 70 && degree <= 110) && (fast)) {
        a = 1;
    }
//NNE,NE
    else if ((degree >= 20 && degree <= 55) && (slow)) {
        a = 3;
    }
    else if ((degree >= 20 && degree <= 55) && (middle)) {
        a = 2;
    }
    else if ((degree >= 20 && degree <= 55) && (fast)) {
        a = 1;
    }
//ENE
    else if ((degree >= 55 && degree <= 70) && (slow)) {
        a = 3;
    }
    else if ((degree >= 55 && degree <= 70) && (middle)) {
        a = 3;
    } else if ((degree >= 55 && degree <= 70) && (fast)) {
        a = 2;
    }
//S
    else if ((degree >= 160 && degree <= 200) && (slow)) {
        a = 9;
    }
    else if ((degree >= 160 && degree <= 200) && (middle)) {
        a = 4;
    } else if ((degree >= 160 && degree <= 200) && (fast)) {
        a = 2;
    }
//SSE,SE,ESE
    else if ((degree >= 110 && degree <= 160) && (slow)) {
        a = 5;
    }
    else if ((degree >= 160 && degree <= 200) && (middle)) {
        a = 4;
    } else if ((degree >= 160 && degree <= 200) && (fast)) {
        a = 3;
    }
//W
    else if ((degree >= 250 && degree <= 290) && (slow)) {
        a = 10;
    }
    else if ((degree >= 250 && degree <= 290) && (middle)) {
        a = 5;
    } else if ((degree >= 250 && degree <= 290) && (fast)) {
        a = 2;
    }
//SSW,SW,WSW
    else if ((degree >= 200 && degree <= 250) && (slow)) {
        a = 9;
    }
    else if ((degree >= 200 && degree <= 250) && (middle)) {
        a = 5;
    } else if ((degree >= 200 && degree <= 250) && (fast)) {
        a = 3;
    }
//WNW,NW,NNW
    else if ((degree >= 290 && degree <= 340) && (slow)) {
        a = 5;
    }
    else if ((degree >= 290 && degree <= 340) && (middle)) {
        a = 2;
    } else if ((degree >= 290 && degree <= 340) && (fast)) {
        a = 0;
    }
    return a;
}
//-----------------------------------------------------------------—
//PRESSURE(today)

function karas_Some_func(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var a = 0;
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - 1 - i; j++) {
            if (arr[j + 1] < arr[j]) {
                var t = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = t;
            }
        }
    }
//return arr;
    function f1() {
        var deff = Math.abs(arr[3] - arr[0]);

        if (deff >= 0 && deff <= 2) {
            a = 10;
        }

        return a;
    }

    return f1();
}
function karas_some_func2(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var deff1 = arr[0] - arr[3];
    var a = 0;
    if (deff1 == 3 || deff1 == 4) {
        a = 9;
    } else if (deff1 == 5) {
        a = 8;
    } else if (deff1 < 0 && deff1 >= -3) {
        a = 10;
    } else if (deff1 < -3 && deff1 >= -8) {
        a = 9;
    } else if (deff1 < -8 && deff1 >= -13) {
        a = 8;
    } else if (deff1 < -13 && deff1 >= -18) {
        a = 7;
    } else if (deff1 < -18 && deff1 >= -23) {
        a = 3;
    } else if (deff1 < -23 && deff1 >= -28) {
        a = 2;
    } else if (deff1 < -28 && deff1 >= -33) {
        a = 1;
    } else if (deff1 < -33 && deff1 >= -45) {
        a = 0;
    } else if (deff1 > 5 && deff1 <= 10) {
        a = 5;
    } else if (deff1 > 10 && deff1 <= 15) {
        a = 4;
    } else if (deff1 > 15 && deff1 <= 20) {
        a = 3;
    } else if (deff1 > 20 && deff1 <= 25) {
        a = 3;
    } else if (deff1 > 25 && deff1 <= 29) {
        a = 2;
    } else if
    (deff1 > 29 && deff1 <= 34) {
        a = 1;
    } else if (deff1 > 34 && deff1 <= 39) {
        a = 1;
    } else if (deff1 > 39 && deff1 <= 45) {
        a = 0;
    }

    return a;

}

function karas_pressure_activity(t1, t2, t3, t4){
    if (karas_Some_func(t1, t2, t3, t4)==0) {
        return karas_some_func2(t1, t2, t3, t4);
    }
    else {
        return karas_Some_func(t1, t2, t3, t4);
    }
}

//----------------------------------------------------------------—
//WATER TEMPERATURE

function karas_activity_water(t) {
    var a = 0;
    if ((t > 0 && t <= 3) || (t > 27 && t < 30)) {
        a = 0;
    } else if ((t >= 4 && t <= 6) || (t == 27)) {
        a = 1;
    } else if ((t >= 7 && t <= 9) || (t == 26)) {
        a = 2;
    } else if ((t == 10) || (t == 25)) {
        a = 3;
    } else if ((t == 11) || (t == 24)) {
        a = 4;
    } else if ((t == 12) || (t == 23)) {
        a = 5;
    } else if ((t == 13) || (t == 22)) {
        a = 6;
    } else if ((t == 14) || (t == 21)) {
        a = 7;
    } else if (t >= 15 && t <= 16) {
        a = 0;
    } else if (t >= 17 && t <= 18) {
        a = 4;
    } else if (t >= 19 && t <= 20) {
        a = 10;
    }
    return a;
}
//--------------------------------------------------------------------------------------—
//MOON SIDE

function karas_activity_moon(md) {
    var a = 0;
    if (md == 1 || md == 29) {
        a = 0;
    } else if (md == 2 || (md >= 12 && md <= 16) || md == 28) {
        a = Math.floor(Math.random() * (3)) + 1;
    } else if (md >= 26 && md <= 27) {
        a = 4;
    } else if (md == 11 || md == 17 || (md >= 23 && md <= 25)) {
        a = 5;
    } else if (md == 3 || md == 18 || md == 9 || md == 10) {
        a = Math.floor(Math.random() * ( 3)) + 6;
    } else if (md >= 20 && md <= 22) {
        a = 9;
    } else {
        a = 10;
    }
    return a;
}

var w = require('./weather');
exports.karas_average = function(node, mw){
    return (karas_activity_moon(w.moon_calc())+karas_activity_water(mw.waterTemp_C)+karas_activity_cloud(mw.hourly[Math.floor((new Date()).getHours()/8)].cloudcover)
        +karas_activity_wind(mw.hourly[Math.floor((new Date()).getHours()/8)].winddirDegree, mw.hourly[Math.floor((new Date()).getHours()/8)].windspeedKmph)
        +karas_pressure_activity(mw.hourly[0].pressure,mw.hourly[2].pressure,mw.hourly[4].pressure,mw.hourly[6].pressure))/5;
};
},{"./weather":11}],7:[function(require,module,exports){
$(function(){
    require("./googleMap");
    require("./API");
    require('./activity');
    require('./weather');
    //require('./premiumApi');
    $(document).ready(function(){
        $("#p1").mouseenter(function(){
            $(this).css("background-color", "#0b9bb6");
        });
        $("#p1").mouseleave(function(){
            $(this).css("background-color", "#0b697c");
        });
        $("#p2").mouseenter(function(){
            $(this).css("background-color", "#0b9bb6");
        });
        $("#p2").mouseleave(function(){
            $(this).css("background-color", "#0b697c");
        });
        $("#p3").mouseenter(function(){
            $(this).css("background-color", "#0b9bb6");
        });
        $("#p3").mouseleave(function(){
            $(this).css("background-color", "#0b697c");
        });
    });

    $("li").each(function(i, item) {
        item = $(item);
        item.click(function(){
            $("#dropdownMenu1").html(item.html());
            var temp = $("#dropdownMenu1").attr("id");
            $("#dropdownMenu1").attr("class", temp);
            $("#dropdownMenu1").attr("id", "");
            $(".name").text($("#dropdownMenu1").find(".text").text());
            var mw = {
                query: google.map.point,
                format: 'JSON',
                fx: '',
                callback: 'MarineWeatherCallback'
            }
            MarineWeather(mw);
        })
    });
    //require('./ddSlick');

    //var fishes = [
    //    {
    //        text: 'Красноперка',
    //        value: 1,
    //        selected: false,
    //        imageSrc: "styles/images/krasnoper.png"
    //    },
    //    {
    //        text: 'Карась',
    //        value: 2,
    //        selected: false,
    //        imageSrc: "styles/images/karas.png"
    //    },
    //    {
    //        text: 'Окунь',
    //        value: 3,
    //        selected: false,
    //        imageSrc: "styles/images/perch.png"
    //    },
    //    {
    //        text: 'Cудак',
    //        value: 4,
    //        selected: false,
    //        imageSrc: "styles/images/sudak.png"
    //    },
    //    {
    //        text: 'Плітка',
    //        value: 5,
    //        selected: false,
    //        imageSrc: "styles/images/plotva.png"
    //    },
    //    {
    //        text: 'Короп',
    //        value: 6,
    //        selected: false,
    //        imageSrc: "styles/images/korop.png"
    //    },
    //    {
    //        text: 'Лящ',
    //        value: 7,
    //        selected: false,
    //        imageSrc: "styles/images/lasch.png"
    //    }
    //];
    //
    //$('#fish').ddslick({
    //    data:fishes,
    //    width:300,
    //    selectText: "Select your preferred social network",
    //    imagePosition:"right",
    //    onSelected: function(selectedData){
    //        //callback function: do something with selectedData;
    //
    //    }
    //});

});
},{"./API":1,"./activity":3,"./googleMap":5,"./weather":11}],8:[function(require,module,exports){
function perch_activity_cloud(k) {
    var a;
    if (k >=0&&k<10) {
        a = 10;
    }else if (k >=10 && k < 20) {
        a = 9;
    } else if (k >= 20 && k<27) {
        a = 9;
    } else if (k >= 27&& k < 30) {
        a = 4;
    } else if (k >= 30 &&k<36) {
        a = 3;
    } else if (k >= 36 && k < 40) {
        a = 2;
    } else if (k >= 40 && k < 50) {
        a = 1;
    } else if (k >= 50 && k < 60) {
        a = 0;
    } else if (k >= 60 && k < 80) {
        a = 0;
    } else if (k >= 80 && k < 90) {
        a = 0;
    }else if (k >= 90 && k <= 100) {
        a = 0;
    } else{
        a = 3;
    }
    return a;
}

//console.log(activity_cloud(95));
//--------------------------------------------------------------------------------------—
//wind direction/speed
function perch_activity_wind(degree,speed){
    var a;

    if(speed==1){
        var slow=true;
    }
    else if(speed>=2&&speed<=8){
        var middle=true;
    }
    else {
        var fast=true;
    }

//N
    if((degree>=0&&degree<=20)&&(slow)){
        a=2;
    }else if((degree>=0&&degree<=20)&&(middle)){
        a=1;
    }else if((degree>=0&&degree<=20)&&(fast)){
        a=0;
//E
    } else if((degree>=70&&degree<=110)&&(slow)){
        a=3;
    }
    else if((degree>=70&&degree<=110)&&(middle)){
        a=2;
    }
    else if((degree>=70&&degree<=110)&&(fast)){
        a=1;
    }
//NNE,NE
    else if((degree>=20&&degree<=55)&&(slow)){
        a=3;
    }
    else if((degree>=20&&degree<=55)&&(middle)){
        a=2;
    }
    else if((degree>=20&&degree<=55)&&(fast)){
        a=1;
    }
//ENE
    else if((degree>=55&&degree<=70)&&(slow)){
        a=3;
    }
    else if((degree>=55&&degree<=70)&&(middle)){
        a=3;
    }else if((degree>=55&&degree<=70)&&(fast)){
        a=2;
    }
//S
    else if((degree>=160&&degree<=200)&&(slow)){
        a=7;
    }
    else if((degree>=160&&degree<=200)&&(middle)){
        a=5;
    }else if((degree>=160&&degree<=200)&&(fast)){
        a=4;
    }
//SSE,SE,ESE
    else if((degree>=110&&degree<=160)&&(slow)){
        a=5;
    }
    else if((degree>=160&&degree<=200)&&(middle)){
        a=4;
    }else if((degree>=160&&degree<=200)&&(fast)){
        a=3;
    }
//W
    else if((degree>=250&&degree<=290)&&(slow)){
        a=10;
    }
    else if((degree>=250&&degree<=290)&&(middle)){
        a=5;
    }else if((degree>=250&&degree<=290)&&(fast)){
        a=2;
    }
//SSW,SW,WSW
    else if((degree>=200&&degree<=250)&&(slow)){
        a=10;
    }
    else if((degree>=200&&degree<=250)&&(middle)){
        a=4;
    }else if((degree>=200&&degree<=250)&&(fast)){
        a=2;
    }
//WNW,NW,NNW
    else if((degree>=290&&degree<=340)&&(slow)){
        a=6;
    }
    else if((degree>=290&&degree<=340)&&(middle)){
        a=4;
    }else if((degree>=290&&degree<=340)&&(fast)){
        a=1;
    }
    return a;
}
//console.log(activity_wind(271,3));
//-------------------------------------------------------------------—
//PRESSURE(today)
function perch_Some_func(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var a =0;
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - 1 - i; j++) {
            if (arr[j + 1] < arr[j]) {
                var t = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = t;
            }
        }
    }

    function f1() {
        var deff = Math.abs(arr[3] - arr[0]);

        if (deff >= 0 && deff <= 2) {
            a = 10;
        }

        return a;
    }
    return f1();
}
function perch_some_func2(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var deff1 = arr[0] - arr[3];
    var a=0;
    if (deff1 == 3 || deff1 == 4) {
        a = 9;
    } else if (deff1 == 5) {
        a = 8;
    } else if (deff1 < 0 && deff1 >= -3) {
        a = 7;
    } else if (deff1 < -3 && deff1 >= -8) {
        a = 5;
    } else if (deff1 < -8 && deff1 >= -13) {
        a = 5;
    } else if (deff1 < -13 && deff1 >= -18) {
        a = 6;
    } else if (deff1 < -18 && deff1 >= -23) {
        a = 5;
    } else if (deff1 < -23 && deff1 >= -28) {
        a = 3;
    } else if (deff1 < -28 && deff1 >= -33) {
        a = 0;
    } else if (deff1 < -33 && deff1 >= -45) {
        a = 0;
    } else if (deff1 > 5 && deff1 <= 10) {
        a = 7;
    } else if (deff1 > 10 && deff1 <= 15) {
        a = 6;
    } else if (deff1 > 15 && deff1 <= 20) {
        a = 3;
    } else if (deff1 > 20 && deff1 <= 25) {
        a = 2;
    } else if (deff1 > 25 && deff1 <= 29) {
        a = 1;
    } else if (deff1 > 29 && deff1 <= 34) {
        a = 2;
    } else if (deff1 > 34 && deff1 <= 39) {
        a = 1;
    } else if (deff1 > 39 && deff1 <= 45) {
        a = 0;
    }

    return a;

}

function perch_pressure_activity(t1, t2, t3, t4){
    if (perch_Some_func(t1, t2, t3, t4)==0) {
        return perch_some_func2(t1, t2, t3, t4);
    }
    else {
        return perch_Some_func(t1, t2, t3, t4);
    }
}

//----------------------------------------------------------------—
//WATER TEMPERATURE

function perch_activity_water(t) {
    var a = 0;
    if (t > 0 && t <= 3) {
        a = 10;
    } else if (t >= 4 && t <= 9) {
        a = 9;
    } else if (t == 10) {
        a = 8;
    } else if (t >= 11&&t<=14) {
        a = 7;
    } else if (t == 14&&t<=18) {
        a = 7;
    } else if (t >= 18 && t <= 22) {
        a = Math.floor(Math.random() * (2)) + 4;
    } else if (t >= 22 && t <= 25) {
        a = Math.floor(Math.random() * (3)) + 1;
    }else{
        a=0;
    }
    return a;
}
//--------------------------------------------------------------------------------------—
//MOON SIDE

function perch_activity_moon(md) {
    var a = 0;
    if (md == 1 || md == 29) {
        a = 0;
    } else if (md == 2 || (md >= 12 && md <= 16) || md == 28) {
        a = Math.floor(Math.random() * (3)) + 1;
    } else if (md >= 26 && md <= 27) {
        a = 4;
    } else if (md == 11 || md == 17 || (md >= 23 && md <= 25)) {
        a = 5;
    } else if (md == 3 || md == 18 || md == 9 || md == 10) {
        a = Math.floor(Math.random() * ( 3)) + 6;
    } else if (md >= 20 && md <= 22) {
        a = 9;
    } else {
        a = 10;
    }
    return a;
}
var w = require('./weather');
exports.perch_average = function(node, mw){
    return (perch_activity_moon(w.moon_calc())+perch_activity_water(mw.waterTemp_C)+perch_activity_cloud(mw.hourly[Math.floor((new Date()).getHours()/8)].cloudcover)
        +perch_activity_wind(mw.hourly[Math.floor((new Date()).getHours()/8)].winddirDegree, mw.hourly[Math.floor((new Date()).getHours()/8)].windspeedKmph)
        +perch_pressure_activity(mw.hourly[0].pressure,mw.hourly[2].pressure,mw.hourly[4].pressure,mw.hourly[6].pressure))/5;


};
},{"./weather":11}],9:[function(require,module,exports){
function pike_activity_cloud(k) {
    var a;
    if (k >=0&&k<10) {
        a = 4;
    }else if (k >=10 && k < 20) {
        a = 5;
    } else if (k >= 20 && k<30) {
        a = 8;
    } else if (k >= 30 &&k<40) {
        a = 10;
    } else if (k >= 40 && k < 50) {
        a = 9;
    } else if (k >= 50 && k < 60) {
        a = 7;
    } else if (k >= 60 && k < 80) {
        a = 0;
    } else if (k >= 80 && k < 90) {
        a = 1;
    }else if (k >= 90 && k <= 100) {
        a = 2;
    } else{
        a = 3;
    }
    return a;
}
//
//console.log(activity_cloud(95));
//--------------------------------------------------------------------------------------—
//wind direction/speed
function pike_activity_wind(degree,speed){
    var a;

    if(speed==1){
        var slow=true;
    }
    else if(speed>=2&&speed<=8){
        var middle=true;
    }
    else {
        var fast=true;
    }

//N
    if((degree>=0&&degree<=20)&&(slow)){
        a=9;
    }else if((degree>=0&&degree<=20)&&(middle)){
        a=5;
    }else if((degree>=0&&degree<=20)&&(fast)){
        a=0;
//E
    } else if((degree>=70&&degree<=110)&&(slow)){
        a=3;
    }
    else if((degree>=70&&degree<=110)&&(middle)){
        a=2;
    }
    else if((degree>=70&&degree<=110)&&(fast)){
        a=1;
    }
//NNE,NE
    else if((degree>=20&&degree<=55)&&(slow)){
        a=3;
    }
    else if((degree>=20&&degree<=55)&&(middle)){
        a=2;
    }
    else if((degree>=20&&degree<=55)&&(fast)){
        a=1;
    }
//ENE
    else if((degree>=55&&degree<=70)&&(slow)){
        a=3;
    }
    else if((degree>=55&&degree<=70)&&(middle)){
        a=2;
    }else if((degree>=55&&degree<=70)&&(fast)){
        a=1;
    }
//S
    else if((degree>=160&&degree<=200)&&(slow)){
        a=9;
    }
    else if((degree>=160&&degree<=200)&&(middle)){
        a=5;
    }else if((degree>=160&&degree<=200)&&(fast)){
        a=2;
    }
//SSE,SE,ESE
    else if((degree>=110&&degree<=160)&&(slow)){
        a=6;
    }
    else if((degree>=160&&degree<=200)&&(middle)){
        a=5;
    }else if((degree>=160&&degree<=200)&&(fast)){
        a=2;
    }
//W
    else if((degree>=250&&degree<=290)&&(slow)){
        a=10;
    }
    else if((degree>=250&&degree<=290)&&(middle)){
        a=8;
    }else if((degree>=250&&degree<=290)&&(fast)){
        a=4;
    }
//SSW,SW,WSW
    else if((degree>=200&&degree<=250)&&(slow)){
        a=8;
    }
    else if((degree>=200&&degree<=250)&&(middle)){
        a=6;
    }else if((degree>=200&&degree<=250)&&(fast)){
        a=2;
    }
//WNW,NW,NNW
    else if((degree>=290&&degree<=340)&&(slow)){
        a=7;
    }
    else if((degree>=290&&degree<=340)&&(middle)){
        a=4;
    }else if((degree>=290&&degree<=340)&&(fast)){
        a=1;
    }
    return a;
}
//console.log(activity_wind(271,3));
//-------------------------------------------------------------------—
//PRESSURE(today)
function pike_Some_func(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var a =0;
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - 1 - i; j++) {
            if (arr[j + 1] < arr[j]) {
                var t = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = t;
            }
        }
    }
    function f1() {
        var deff = Math.abs(arr[3] - arr[0]);

        if (deff >= 0 && deff <= 2) {
            a = 10;
        }

        return a;
    }
    return f1();
}
function pike_some_func2(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var deff1 = arr[0] - arr[3];
    var a=0;
    if (deff1 == 3 || deff1 == 4) {
        a = 9;
    } else if (deff1 == 5) {
        a = 8;
    } else if (deff1 < 0 && deff1 >= -3) {
        a = 7;
    } else if (deff1 < -3 && deff1 >= -8) {
        a = 6;
    } else if (deff1 < -8 && deff1 >= -13) {
        a = 5;
    } else if (deff1 < -13 && deff1 >= -18) {
        a = 4;
    } else if (deff1 < -18 && deff1 >= -23) {
        a = 3;
    } else if (deff1 < -23 && deff1 >= -28) {
        a = 2;
    } else if (deff1 < -28 && deff1 >= -33) {
        a = 1;
    } else if (deff1 < -33 && deff1 >= -45) {
        a = 0;
    } else if (deff1 > 5 && deff1 <= 10) {
        a = 7;
    } else if (deff1 > 10 && deff1 <= 15) {
        a = 6;
    } else if (deff1 > 15 && deff1 <= 20) {
        a = 5;
    } else if (deff1 > 20 && deff1 <= 25) {
        a = 4;
    } else if (deff1 > 25 && deff1 <= 29) {
        a = 3;
    } else if (deff1 > 29 && deff1 <= 34) {
        a = 2;
    } else if (deff1 > 34 && deff1 <= 39) {
        a = 1;
    } else if (deff1 > 39 && deff1 <= 45) {
        a = 0;
    }

    return a;

}

function pike_pressure_activity(t1, t2, t3, t4){
    if (pike_Some_func(t1, t2, t3, t4)==0) {
        return pike_some_func2(t1, t2, t3, t4);
    }
    else {
        return pike_Some_func(t1, t2, t3, t4);
    }
}

//----------------------------------------------------------------—
//WATER TEMPERATURE

function pike_activity_water(t) {
    var a = 0;
    if (t > 0 && t <= 3) {
        a = 10;
    } else if (t >= 4 && t <= 9) {
        a = 9;
    } else if (t == 10) {
        a = 8;
    } else if (t >= 11&&t<=14) {
        a = 7;
    } else if (t == 14&&t<=18) {
        a = 7;
    } else if (t >= 18 && t <= 20) {
        a = 6;
    } else if (t >= 20 && t <= 22) {
        a = 5;
    } else if (t >= 22 && t <= 24) {
        a = Math.floor(Math.random() * (3)) + 1;
    }else{
        a=0;
    }
    return a;
}
//--------------------------------------------------------------------------------------—
//MOON SIDE

function pike_activity_moon(md) {
    var a = 0;
    if (md == 1 || md == 29) {
        a = 0;
    } else if (md == 2 || (md >= 12 && md <= 16) || md == 28) {
        a = Math.floor(Math.random() * (3)) + 1;
    } else if (md >= 26 && md <= 27) {
        a = 4;
    } else if (md == 11 || md == 17 || (md >= 23 && md <= 25)) {
        a = 5;
    } else if (md == 3 || md == 18 || md == 9 || md == 10) {
        a = Math.floor(Math.random() * ( 3)) + 6;
    } else if (md >= 20 && md <= 22) {
        a = 9;
    } else {
        a = 10;
    }
    return a;
}

var w = require('./weather');
exports.pike_average = function(node, mw){
    return (pike._activity_moon(w.moon_calc())+pike_activity_water(mw.waterTemp_C)+pike_activity_cloud(mw.hourly[Math.floor((new Date()).getHours()/8)].cloudcover)
        +pike_activity_wind(mw.hourly[Math.floor((new Date()).getHours()/8)].winddirDegree, mw.hourly[Math.floor((new Date()).getHours()/8)].windspeedKmph)
        +pike_pressure_activity(mw.hourly[0].pressure,mw.hourly[2].pressure,mw.hourly[4].pressure,mw.hourly[6].pressure))/5;
};
},{"./weather":11}],10:[function(require,module,exports){
function plotva_activity_cloud(k) {
    var a;
    if (k >=0&&k<10) {
        a = 10;
    }else if (k >=10 && k < 20) {
        a = 10;
    } else if (k >= 20 && k<30) {
        a = 9;
    } else if (k >= 30 &&k<36) {
        a = 5;
    } else if (k >= 36 && k < 40) {
        a = 3;
    } else if (k >= 40 && k < 50) {
        a = 2;
    } else if (k >= 50 && k < 60) {
        a = 1;
    } else if (k >= 60 && k < 80) {
        a = 0;
    } else if (k >= 80 && k < 90) {
        a = 0;
    }else if (k >= 90 && k <= 100) {
        a = 0;
    } else{
        a = 0;
    }
    return a;
}
//
//console.log(activity_cloud(95));
//--------------------------------------------------------------------------------------—

function plotva_activity_wind(degree,speed){
    var a;

    if(speed==1){
        var slow=true;
    }
    else if(speed>=2&&speed<=8){
        var middle=true;
    }
    else {
        var fast=true;
    }

//N
    if((degree>=0&&degree<=20)&&(slow)){
        a=8;
    }else if((degree>=0&&degree<=20)&&(middle)){
        a=5;
    }else if((degree>=0&&degree<=20)&&(fast)){
        a=0;
//E
    } else if((degree>=70&&degree<=110)&&(slow)){
        a=8;
    }
    else if((degree>=70&&degree<=110)&&(middle)){
        a=1;
    }
    else if((degree>=70&&degree<=110)&&(fast)){
        a=1;
    }
//NNE,NE
    else if((degree>=20&&degree<=55)&&(slow)){
        a=4;
    }
    else if((degree>=20&&degree<=55)&&(middle)){
        a=2;
    }
    else if((degree>=20&&degree<=55)&&(fast)){
        a=0;
    }
//ENE
    else if((degree>=55&&degree<=70)&&(slow)){
        a=6;
    }
    else if((degree>=55&&degree<=70)&&(middle)){
        a=1;
    }else if((degree>=55&&degree<=70)&&(fast)){
        a=1;
    }
//S
    else if((degree>=160&&degree<=200)&&(slow)){
        a=10;
    }
    else if((degree>=160&&degree<=200)&&(middle)){
        a=6;
    }else if((degree>=160&&degree<=200)&&(fast)){
        a=2;
    }
//SSE,SE,ESE
    else if((degree>=110&&degree<=160)&&(slow)){
        a=4;
    }
    else if((degree>=160&&degree<=200)&&(middle)){
        a=1;
    }else if((degree>=160&&degree<=200)&&(fast)){
        a=0;
    }
//W
    else if((degree>=250&&degree<=290)&&(slow)){
        a=10;
    }
    else if((degree>=250&&degree<=290)&&(middle)){
        a=7;
    }else if((degree>=250&&degree<=290)&&(fast)){
        a=3;
    }
//SSW,SW,WSW
    else if((degree>=200&&degree<=250)&&(slow)){
        a=8;
    }
    else if((degree>=200&&degree<=250)&&(middle)){
        a=4;
    }else if((degree>=200&&degree<=250)&&(fast)){
        a=1;
    }
//WNW,NW,NNW
    else if((degree>=290&&degree<=340)&&(slow)){
        a=5;
    }
    else if((degree>=290&&degree<=340)&&(middle)){
        a=2;
    }else if((degree>=290&&degree<=340)&&(fast)){
        a=0;
    }
    return a;
}
//-----------------------------------------------------------------—
//PRESSURE(today)
function plotva_Some_func(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var a =0;
    var n = arr.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - 1 - i; j++) {
            if (arr[j + 1] < arr[j]) {
                var t = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = t;
            }
        }
    }
//return arr;
    function f1() {
        var deff = Math.abs(arr[3] - arr[0]);

        if (deff >= 0 && deff <= 2) {
            a = 10;
        }

        return a;
    }
    return f1();
}
function plotva_some_func2(t1, t2, t3, t4) {
    var arr = [t1, t2, t3, t4];
    var deff1 = arr[0] - arr[3];
    var a = 0;
    if (deff1 == 3 || deff1 == 4) {
        a = 9;
    } else if (deff1 == 5) {
        a = 8;
    } else if (deff1 < 0 && deff1 >= -3) {
        a = 10;
    } else if (deff1 < -3 && deff1 >= -8) {
        a = 9;
    } else if (deff1 < -8 && deff1 >= -13) {
        a = 8;
    } else if (deff1 < -13 && deff1 >= -18) {
        a = 7;
    } else if (deff1 < -18 && deff1 >= -23) {
        a = 6;
    } else if (deff1 < -23 && deff1 >= -28) {
        a = 5;
    } else if (deff1 < -28 && deff1 >= -33) {
        a = 1;
    } else if (deff1 < -33 && deff1 >= -45) {
        a = 0;
    } else if (deff1 > 5 && deff1 <= 45) {
        a = 1;
    }
    return a;

}

function plotva_pressure_activity(t1, t2, t3, t4){
    if (plotva_Some_func(t1, t2, t3, t4)==0) {
        return plotva_some_func2(t1, t2, t3, t4);
    }
    else {
        return plotva_Some_func(t1, t2, t3, t4);
    }
}

//----------------------------------------------------------------—
//WATER TEMPERATURE

function plotva_activity_water(t) {
    var a = 0;
    if ((t > 0 && t <= 3) || (t > 27 && t < 30)) {
        a = 0;
    } else if ((t >= 4 && t <= 6) || (t == 27)) {
        a = 1;
    } else if ((t >= 7 && t <= 9) || (t == 26)) {
        a = 1;
    } else if ((t == 10) || (t == 25)) {
        a = 2;
    } else if ((t == 11) || (t == 24)) {
        a = 6;
    } else if ((t == 12) || (t == 23)) {
        a = 6;
    } else if ((t == 13) || (t == 22)) {
        a = 7;
    } else if ((t == 14) || (t == 21)) {
        a = 8;
    } else if (t >= 15 && t <= 16) {
        a = 9;
    } else if (t >= 17 && t <= 18) {
        a = 10;
    } else if (t >= 19 && t <= 20) {
        a = 10;
    }
    return a;
}
//--------------------------------------------------------------------------------------—
//MOON SIDE

function plotva_activity_moon(md) {
    var a = 0;
    if (md == 1 || md == 29) {
        a = 0;
    } else if (md == 2 || (md >= 12 && md <= 16) || md == 28) {
        a = Math.floor(Math.random() * (3)) + 1;
    } else if (md >= 26 && md <= 27) {
        a = 4;
    } else if (md == 11 || md == 17 || (md >= 23 && md <= 25)) {
        a = 5;
    } else if (md == 3 || md == 18 || md == 9 || md == 10) {
        a = Math.floor(Math.random() * ( 3)) + 6;
    } else if (md >= 20 && md <= 22) {
        a = 9;
    } else {
        a = 10;
    }
    return a;
}

var w = require('./weather');
exports.plotva_average = function(node, mw){
    return (plotva_activity_moon(w.moon_calc())+plotva_activity_water(mw.waterTemp_C)+plotva_activity_cloud(mw.hourly[Math.floor((new Date()).getHours()/8)].cloudcover)
        +plotva_activity_wind(mw.hourly[Math.floor((new Date()).getHours()/8)].winddirDegree, mw.hourly[Math.floor((new Date()).getHours()/8)].windspeedKmph)
        +plotva_pressure_activity(mw.hourly[0].pressure,mw.hourly[2].pressure,mw.hourly[4].pressure,mw.hourly[6].pressure))/5;
};
},{"./weather":11}],11:[function(require,module,exports){
var KEY = "b9dfb1a729dc44a0a58132343162804";

var _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';

var _PremiumApiKey = 'b9dfb1a729dc44a0a58132343162804';

// -------------------------------------------

function JSONP_LocalWeather(input) {
    var url = _PremiumApiBaseURL + 'weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&num_of_days=' + input.num_of_days + '&date=' + input.date + '&fx=' + input.fx + '&tp=' + input.tp + '&cc=' + input.cc + '&includelocation=' + input.includelocation + '&show_comments=' + input.show_comments + '&key=' + _PremiumApiKey;

    jsonP(url, input.callback);
}

function JSONP_SearchLocation(input) {
    var url = _PremiumApiBaseURL + "search.ashx?q=" + input.query + "&format=" + input.format + "&timezone=" + input.timezone + "&popular=" + input.popular + "&num_of_results=" + input.num_of_results + "&key=" + _PremiumApiKey;

    jsonP(url, input.callback);
}

function JSONP_TimeZone(input) {
    var url = _PremiumApiBaseURL + "tz.ashx?q=" + input.query + "&format=" + input.format + "&key=" + _PremiumApiKey;

    jsonP(url, input.callback);
}

exports.MarineWeather = function(input) {
    JSONP_MarineWeather(input);
};

function JSONP_MarineWeather(input) {
    var url = _PremiumApiBaseURL + "marine.ashx?q=" + input.query + "&format=" + input.format + "&fx=" + input.fx + "&key=" + _PremiumApiKey;

    jsonP(url, input.callback);
};

function JSONP_PastWeather(input) {
    var url = _PremiumApiBaseURL + 'past-weather.ashx?q=' + input.query + '&format=' + input.format + '&extra=' + input.extra + '&date=' + input.date + '&enddate=' + input.enddate + '&includelocation=' + input.includelocation + '&key=' + _PremiumApiKey;

    jsonP(url, input.callback);
}

// -------------------------------------------

// Helper Method
function jsonP(url, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        jsonpCallback: callback,
        dataType: 'jsonp',
        success: function (json) {
            console.dir('success');
            MarineWeatherCallback(json)
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}

// callbacks
var marineWeatherInput = {
    query: '53,30',
    format: 'JSON',
    fx: '',
    callback: 'MarineWeatherCallback'
};
$("#w").click(JSONP_MarineWeather(marineWeatherInput));
var Table = require('./Table_template');
var SunCalc = require('suncalc');
var act = require('./activity');
function MarineWeatherCallback(marineWeather) {
    var $html = $(Table.Table);
    console.log($html);
    var mow = new Date();
    var mw = marineWeather.data.weather[0];
    $html.find(".clouds_block").find('img').attr("src", mw.weatherIconUrl);
    $html.find(".date").text(mw.date);
    $html.find(".clouds").find(clouds(mw.hourly[Math.floor(mow.getHours()/8)].cloudcover)).attr("style", "");
    $html.find(".preasure").text(mw.hourly[Math.floor(mow.getHours()/8)].preasure);
    $html.find(".wind_direction").find(winddir(mw.hourly[Math.floor(mow.getHours()/8)]).winddir16Point).attr("style", "");
    $html.find(".moon_phase").text(moon_calc()+"д.");
    $html.find(".result").text(act.average($html, mw)+"/10");
    $(".table_act").appendTo($html);
    console.log($html);

}
function clouds(percents){
    var num = Math.floor(percents/10);
    return "clouds"+num;

}
function winddir(point){
    var num =0;

    if(point ==='NNW' || point === "NW" || point === "WNW") num = 1;
    else if(point === 'W') num = 2;
    if(point ==='SSW' || point === "SW" || point === "WSW") num = 3;
    else if(point === 'S') num = 4;
    if(point ==='SSE' || point === "SE" || point === "ESE") num = 5;
    else if(point === 'E') num = 6;
    else if(point ==='NNE' || point === "NE" || point === "ENE") num = 7;

    return "wind_direction"+num;
}
exports.moon_calc = function(){
    var phase = SunCalc.getMoonIllumination(/*Date*/ Date.now()).phase;
    var month = 29.5305882;
    if(phase===0) return 1;
    return Math.floor(phase*month);
};
function moon_calc(){
    var phase = SunCalc.getMoonIllumination(/*Date*/ Date.now()).phase;
    var month = 29.5305882;
    if(phase===0) return 1;
    return Math.floor(phase*month);
}



},{"./Table_template":2,"./activity":3,"suncalc":18}],12:[function(require,module,exports){
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

'use strict';

/**
 * @file Embedded JavaScript templating engine.
 * @author Matthew Eernisse <mde@fleegix.org>
 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
 * @project EJS
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
 */

/**
 * EJS internal functions.
 *
 * Technically this "module" lies in the same file as {@link module:ejs}, for
 * the sake of organization all the private functions re grouped into this
 * module.
 *
 * @module ejs-internal
 * @private
 */

/**
 * Embedded JavaScript templating engine.
 *
 * @module ejs
 * @public
 */

var fs = require('fs')
  , utils = require('./utils')
  , scopeOptionWarned = false
  , _VERSION_STRING = require('../package.json').version
  , _DEFAULT_DELIMITER = '%'
  , _DEFAULT_LOCALS_NAME = 'locals'
  , _REGEX_STRING = '(<%%|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)'
  , _OPTS = [ 'cache', 'filename', 'delimiter', 'scope', 'context'
            , 'debug', 'compileDebug', 'client', '_with', 'rmWhitespace'
            , 'strict', 'localsName'
            ]
  , _TRAILING_SEMCOL = /;\s*$/
  , _BOM = /^\uFEFF/;

/**
 * EJS template function cache. This can be a LRU object from lru-cache NPM
 * module. By default, it is {@link module:utils.cache}, a simple in-process
 * cache that grows continuously.
 *
 * @type {Cache}
 */

exports.cache = utils.cache;

/**
 * Name of the object containing the locals.
 *
 * This variable is overriden by {@link Options}`.localsName` if it is not
 * `undefined`.
 *
 * @type {String}
 * @public
 */

exports.localsName = _DEFAULT_LOCALS_NAME;

/**
 * Get the path to the included file from the parent file path and the
 * specified path.
 *
 * @param {String} name     specified path
 * @param {String} filename parent file path
 * @return {String}
 */

exports.resolveInclude = function(name, filename) {
  var path = require('path')
    , dirname = path.dirname
    , extname = path.extname
    , resolve = path.resolve
    , includePath = resolve(dirname(filename), name)
    , ext = extname(name);
  if (!ext) {
    includePath += '.ejs';
  }
  return includePath;
};

/**
 * Get the template from a string or a file, either compiled on-the-fly or
 * read from cache (if enabled), and cache the template if needed.
 *
 * If `template` is not set, the file specified in `options.filename` will be
 * read.
 *
 * If `options.cache` is true, this function reads the file from
 * `options.filename` so it must be set prior to calling this function.
 *
 * @memberof module:ejs-internal
 * @param {Options} options   compilation options
 * @param {String} [template] template source
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned.
 * @static
 */

function handleCache(options, template) {
  var fn
    , path = options.filename
    , hasTemplate = arguments.length > 1;

  if (options.cache) {
    if (!path) {
      throw new Error('cache option requires a filename');
    }
    fn = exports.cache.get(path);
    if (fn) {
      return fn;
    }
    if (!hasTemplate) {
      template = fs.readFileSync(path).toString().replace(_BOM, '');
    }
  }
  else if (!hasTemplate) {
    // istanbul ignore if: should not happen at all
    if (!path) {
      throw new Error('Internal EJS error: no file name or template '
                    + 'provided');
    }
    template = fs.readFileSync(path).toString().replace(_BOM, '');
  }
  fn = exports.compile(template, options);
  if (options.cache) {
    exports.cache.set(path, fn);
  }
  return fn;
}

/**
 * Get the template function.
 *
 * If `options.cache` is `true`, then the template is cached.
 *
 * @memberof module:ejs-internal
 * @param {String}  path    path for the specified file
 * @param {Options} options compilation options
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned
 * @static
 */

function includeFile(path, options) {
  var opts = utils.shallowCopy({}, options);
  if (!opts.filename) {
    throw new Error('`include` requires the \'filename\' option.');
  }
  opts.filename = exports.resolveInclude(path, opts.filename);
  return handleCache(opts);
}

/**
 * Get the JavaScript source of an included file.
 *
 * @memberof module:ejs-internal
 * @param {String}  path    path for the specified file
 * @param {Options} options compilation options
 * @return {String}
 * @static
 */

function includeSource(path, options) {
  var opts = utils.shallowCopy({}, options)
    , includePath
    , template;
  if (!opts.filename) {
    throw new Error('`include` requires the \'filename\' option.');
  }
  includePath = exports.resolveInclude(path, opts.filename);
  template = fs.readFileSync(includePath).toString().replace(_BOM, '');

  opts.filename = includePath;
  var templ = new Template(template, opts);
  templ.generateSource();
  return templ.source;
}

/**
 * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
 * `lineno`.
 *
 * @implements RethrowCallback
 * @memberof module:ejs-internal
 * @param {Error}  err      Error object
 * @param {String} str      EJS source
 * @param {String} filename file name of the EJS file
 * @param {String} lineno   line number of the error
 * @static
 */

function rethrow(err, str, filename, lineno){
  var lines = str.split('\n')
    , start = Math.max(lineno - 3, 0)
    , end = Math.min(lines.length, lineno + 3);

  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
}

/**
 * Copy properties in data object that are recognized as options to an
 * options object.
 *
 * This is used for compatibility with earlier versions of EJS and Express.js.
 *
 * @memberof module:ejs-internal
 * @param {Object}  data data object
 * @param {Options} opts options object
 * @static
 */

function cpOptsInData(data, opts) {
  _OPTS.forEach(function (p) {
    if (typeof data[p] != 'undefined') {
      opts[p] = data[p];
    }
  });
}

/**
 * Compile the given `str` of ejs into a template function.
 *
 * @param {String}  template EJS template
 *
 * @param {Options} opts     compilation options
 *
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `opts.client`, either type might be returned.
 * @public
 */

exports.compile = function compile(template, opts) {
  var templ;

  // v1 compat
  // 'scope' is 'context'
  // FIXME: Remove this in a future version
  if (opts && opts.scope) {
    if (!scopeOptionWarned){
      console.warn('`scope` option is deprecated and will be removed in EJS 3');
      scopeOptionWarned = true;
    }
    if (!opts.context) {
      opts.context = opts.scope;
    }
    delete opts.scope;
  }
  templ = new Template(template, opts);
  return templ.compile();
};

/**
 * Render the given `template` of ejs.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}   template EJS template
 * @param {Object}  [data={}] template data
 * @param {Options} [opts={}] compilation and rendering options
 * @return {String}
 * @public
 */

exports.render = function (template, data, opts) {
  data = data || {};
  opts = opts || {};
  var fn;

  // No options object -- if there are optiony names
  // in the data, copy them to options
  if (arguments.length == 2) {
    cpOptsInData(data, opts);
  }

  return handleCache(opts, template)(data);
};

/**
 * Render an EJS file at the given `path` and callback `cb(err, str)`.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}             path     path to the EJS file
 * @param {Object}            [data={}] template data
 * @param {Options}           [opts={}] compilation and rendering options
 * @param {RenderFileCallback} cb callback
 * @public
 */

exports.renderFile = function () {
  var args = Array.prototype.slice.call(arguments)
    , path = args.shift()
    , cb = args.pop()
    , data = args.shift() || {}
    , opts = args.pop() || {}
    , result;

  // Don't pollute passed in opts obj with new vals
  opts = utils.shallowCopy({}, opts);

  // No options object -- if there are optiony names
  // in the data, copy them to options
  if (arguments.length == 3) {
    // Express 4
    if (data.settings && data.settings['view options']) {
      cpOptsInData(data.settings['view options'], opts);
    }
    // Express 3 and lower
    else {
      cpOptsInData(data, opts);
    }
  }
  opts.filename = path;

  try {
    result = handleCache(opts)(data);
  }
  catch(err) {
    return cb(err);
  }
  return cb(null, result);
};

/**
 * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
 * @public
 */

exports.clearCache = function () {
  exports.cache.reset();
};

function Template(text, opts) {
  opts = opts || {};
  var options = {};
  this.templateText = text;
  this.mode = null;
  this.truncate = false;
  this.currentLine = 1;
  this.source = '';
  this.dependencies = [];
  options.client = opts.client || false;
  options.escapeFunction = opts.escape || utils.escapeXML;
  options.compileDebug = opts.compileDebug !== false;
  options.debug = !!opts.debug;
  options.filename = opts.filename;
  options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
  options.strict = opts.strict || false;
  options.context = opts.context;
  options.cache = opts.cache || false;
  options.rmWhitespace = opts.rmWhitespace;
  options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;

  if (options.strict) {
    options._with = false;
  }
  else {
    options._with = typeof opts._with != 'undefined' ? opts._with : true;
  }

  this.opts = options;

  this.regex = this.createRegex();
}

Template.modes = {
  EVAL: 'eval'
, ESCAPED: 'escaped'
, RAW: 'raw'
, COMMENT: 'comment'
, LITERAL: 'literal'
};

Template.prototype = {
  createRegex: function () {
    var str = _REGEX_STRING
      , delim = utils.escapeRegExpChars(this.opts.delimiter);
    str = str.replace(/%/g, delim);
    return new RegExp(str);
  }

, compile: function () {
    var src
      , fn
      , opts = this.opts
      , prepended = ''
      , appended = ''
      , escape = opts.escapeFunction;

    if (opts.rmWhitespace) {
      // Have to use two separate replace here as `^` and `$` operators don't
      // work well with `\r`.
      this.templateText =
        this.templateText.replace(/\r/g, '').replace(/^\s+|\s+$/gm, '');
    }

    // Slurp spaces and tabs before <%_ and after _%>
    this.templateText =
      this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');

    if (!this.source) {
      this.generateSource();
      prepended += '  var __output = [], __append = __output.push.bind(__output);' + '\n';
      if (opts._with !== false) {
        prepended +=  '  with (' + opts.localsName + ' || {}) {' + '\n';
        appended += '  }' + '\n';
      }
      appended += '  return __output.join("");' + '\n';
      this.source = prepended + this.source + appended;
    }

    if (opts.compileDebug) {
      src = 'var __line = 1' + '\n'
          + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
          + '  , __filename = ' + (opts.filename ?
                JSON.stringify(opts.filename) : 'undefined') + ';' + '\n'
          + 'try {' + '\n'
          + this.source
          + '} catch (e) {' + '\n'
          + '  rethrow(e, __lines, __filename, __line);' + '\n'
          + '}' + '\n';
    }
    else {
      src = this.source;
    }

    if (opts.debug) {
      console.log(src);
    }

    if (opts.client) {
      src = 'escape = escape || ' + escape.toString() + ';' + '\n' + src;
      if (opts.compileDebug) {
        src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
      }
    }

    if (opts.strict) {
      src = '"use strict";\n' + src;
    }

    try {
      fn = new Function(opts.localsName + ', escape, include, rethrow', src);
    }
    catch(e) {
      // istanbul ignore else
      if (e instanceof SyntaxError) {
        if (opts.filename) {
          e.message += ' in ' + opts.filename;
        }
        e.message += ' while compiling ejs';
      }
      throw e;
    }

    if (opts.client) {
      fn.dependencies = this.dependencies;
      return fn;
    }

    // Return a callable function which will execute the function
    // created by the source-code, with the passed data as locals
    // Adds a local `include` function which allows full recursive include
    var returnedFn = function (data) {
      var include = function (path, includeData) {
        var d = utils.shallowCopy({}, data);
        if (includeData) {
          d = utils.shallowCopy(d, includeData);
        }
        return includeFile(path, opts)(d);
      };
      return fn.apply(opts.context, [data || {}, escape, include, rethrow]);
    };
    returnedFn.dependencies = this.dependencies;
    return returnedFn;
  }

, generateSource: function () {
    var self = this
      , matches = this.parseTemplateText()
      , d = this.opts.delimiter;

    if (matches && matches.length) {
      matches.forEach(function (line, index) {
        var opening
          , closing
          , include
          , includeOpts
          , includeSrc;
        // If this is an opening tag, check for closing tags
        // FIXME: May end up with some false positives here
        // Better to store modes as k/v with '<' + delimiter as key
        // Then this can simply check against the map
        if ( line.indexOf('<' + d) === 0        // If it is a tag
          && line.indexOf('<' + d + d) !== 0) { // and is not escaped
          closing = matches[index + 2];
          if (!(closing == d + '>' || closing == '-' + d + '>' || closing == '_' + d + '>')) {
            throw new Error('Could not find matching close tag for "' + line + '".');
          }
        }
        // HACK: backward-compat `include` preprocessor directives
        if ((include = line.match(/^\s*include\s+(\S+)/))) {
          opening = matches[index - 1];
          // Must be in EVAL or RAW mode
          if (opening && (opening == '<' + d || opening == '<' + d + '-' || opening == '<' + d + '_')) {
            includeOpts = utils.shallowCopy({}, self.opts);
            includeSrc = includeSource(include[1], includeOpts);
            includeSrc = '    ; (function(){' + '\n' + includeSrc +
                '    ; })()' + '\n';
            self.source += includeSrc;
            self.dependencies.push(exports.resolveInclude(include[1],
                includeOpts.filename));
            return;
          }
        }
        self.scanLine(line);
      });
    }

  }

, parseTemplateText: function () {
    var str = this.templateText
      , pat = this.regex
      , result = pat.exec(str)
      , arr = []
      , firstPos
      , lastPos;

    while (result) {
      firstPos = result.index;
      lastPos = pat.lastIndex;

      if (firstPos !== 0) {
        arr.push(str.substring(0, firstPos));
        str = str.slice(firstPos);
      }

      arr.push(result[0]);
      str = str.slice(result[0].length);
      result = pat.exec(str);
    }

    if (str) {
      arr.push(str);
    }

    return arr;
  }

, scanLine: function (line) {
    var self = this
      , d = this.opts.delimiter
      , newLineCount = 0;

    function _addOutput() {
      if (self.truncate) {
        // Only replace single leading linebreak in the line after
        // -%> tag -- this is the single, trailing linebreak
        // after the tag that the truncation mode replaces
        // Handle Win / Unix / old Mac linebreaks -- do the \r\n
        // combo first in the regex-or
        line = line.replace(/^(?:\r\n|\r|\n)/, '')
        self.truncate = false;
      }
      else if (self.opts.rmWhitespace) {
        // Gotta be more careful here.
        // .replace(/^(\s*)\n/, '$1') might be more appropriate here but as
        // rmWhitespace already removes trailing spaces anyway so meh.
        line = line.replace(/^\n/, '');
      }
      if (!line) {
        return;
      }

      // Preserve literal slashes
      line = line.replace(/\\/g, '\\\\');

      // Convert linebreaks
      line = line.replace(/\n/g, '\\n');
      line = line.replace(/\r/g, '\\r');

      // Escape double-quotes
      // - this will be the delimiter during execution
      line = line.replace(/"/g, '\\"');
      self.source += '    ; __append("' + line + '")' + '\n';
    }

    newLineCount = (line.split('\n').length - 1);

    switch (line) {
      case '<' + d:
      case '<' + d + '_':
        this.mode = Template.modes.EVAL;
        break;
      case '<' + d + '=':
        this.mode = Template.modes.ESCAPED;
        break;
      case '<' + d + '-':
        this.mode = Template.modes.RAW;
        break;
      case '<' + d + '#':
        this.mode = Template.modes.COMMENT;
        break;
      case '<' + d + d:
        this.mode = Template.modes.LITERAL;
        this.source += '    ; __append("' + line.replace('<' + d + d, '<' + d) + '")' + '\n';
        break;
      case d + '>':
      case '-' + d + '>':
      case '_' + d + '>':
        if (this.mode == Template.modes.LITERAL) {
          _addOutput();
        }

        this.mode = null;
        this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
        break;
      default:
        // In script mode, depends on type of tag
        if (this.mode) {
          // If '//' is found without a line break, add a line break.
          switch (this.mode) {
            case Template.modes.EVAL:
            case Template.modes.ESCAPED:
            case Template.modes.RAW:
              if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
                line += '\n';
              }
          }
          switch (this.mode) {
            // Just executing code
            case Template.modes.EVAL:
              this.source += '    ; ' + line + '\n';
              break;
            // Exec, esc, and output
            case Template.modes.ESCAPED:
              this.source += '    ; __append(escape(' +
                line.replace(_TRAILING_SEMCOL, '').trim() + '))' + '\n';
              break;
            // Exec and output
            case Template.modes.RAW:
              this.source += '    ; __append(' +
                line.replace(_TRAILING_SEMCOL, '').trim() + ')' + '\n';
              break;
            case Template.modes.COMMENT:
              // Do nothing
              break;
            // Literal <%% mode, append as raw output
            case Template.modes.LITERAL:
              _addOutput();
              break;
          }
        }
        // In string mode, just add the output
        else {
          _addOutput();
        }
    }

    if (self.opts.compileDebug && newLineCount) {
      this.currentLine += newLineCount;
      this.source += '    ; __line = ' + this.currentLine + '\n';
    }
  }
};

/**
 * Express.js support.
 *
 * This is an alias for {@link module:ejs.renderFile}, in order to support
 * Express.js out-of-the-box.
 *
 * @func
 */

exports.__express = exports.renderFile;

// Add require support
/* istanbul ignore else */
if (require.extensions) {
  require.extensions['.ejs'] = function (module, filename) {
    filename = filename || /* istanbul ignore next */ module.filename;
    var options = {
          filename: filename
        , client: true
        }
      , template = fs.readFileSync(filename).toString()
      , fn = exports.compile(template, options);
    module._compile('module.exports = ' + fn.toString() + ';', filename);
  };
}

/**
 * Version of EJS.
 *
 * @readonly
 * @type {String}
 * @public
 */

exports.VERSION = _VERSION_STRING;

/* istanbul ignore if */
if (typeof window != 'undefined') {
  window.ejs = exports;
}

},{"../package.json":14,"./utils":13,"fs":15,"path":16}],13:[function(require,module,exports){
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

/**
 * Private utility functions
 * @module utils
 * @private
 */

'use strict';

var regExpChars = /[|\\{}()[\]^$+*?.]/g;

/**
 * Escape characters reserved in regular expressions.
 *
 * If `string` is `undefined` or `null`, the empty string is returned.
 *
 * @param {String} string Input string
 * @return {String} Escaped string
 * @static
 * @private
 */
exports.escapeRegExpChars = function (string) {
  // istanbul ignore if
  if (!string) {
    return '';
  }
  return String(string).replace(regExpChars, '\\$&');
};

var _ENCODE_HTML_RULES = {
      '&': '&amp;'
    , '<': '&lt;'
    , '>': '&gt;'
    , '"': '&#34;'
    , "'": '&#39;'
    }
  , _MATCH_HTML = /[&<>\'"]/g;

function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};

/**
 * Stringified version of constants used by {@link module:utils.escapeXML}.
 *
 * It is used in the process of generating {@link ClientFunction}s.
 *
 * @readonly
 * @type {String}
 */

var escapeFuncStr =
  'var _ENCODE_HTML_RULES = {\n'
+ '      "&": "&amp;"\n'
+ '    , "<": "&lt;"\n'
+ '    , ">": "&gt;"\n'
+ '    , \'"\': "&#34;"\n'
+ '    , "\'": "&#39;"\n'
+ '    }\n'
+ '  , _MATCH_HTML = /[&<>\'"]/g;\n'
+ 'function encode_char(c) {\n'
+ '  return _ENCODE_HTML_RULES[c] || c;\n'
+ '};\n';

/**
 * Escape characters reserved in XML.
 *
 * If `markup` is `undefined` or `null`, the empty string is returned.
 *
 * @implements {EscapeCallback}
 * @param {String} markup Input string
 * @return {String} Escaped string
 * @static
 * @private
 */

exports.escapeXML = function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
        .replace(_MATCH_HTML, encode_char);
};
exports.escapeXML.toString = function () {
  return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr
};

/**
 * Copy all properties from one object to another, in a shallow fashion.
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @return {Object}      Destination object
 * @static
 * @private
 */
exports.shallowCopy = function (to, from) {
  from = from || {};
  for (var p in from) {
    to[p] = from[p];
  }
  return to;
};

/**
 * Simple in-process cache implementation. Does not implement limits of any
 * sort.
 *
 * @implements Cache
 * @static
 * @private
 */
exports.cache = {
  _data: {},
  set: function (key, val) {
    this._data[key] = val;
  },
  get: function (key) {
    return this._data[key];
  },
  reset: function () {
    this._data = {};
  }
};


},{}],14:[function(require,module,exports){
module.exports={
  "name": "ejs",
  "description": "Embedded JavaScript templates",
  "keywords": [
    "template",
    "engine",
    "ejs"
  ],
  "version": "2.4.1",
  "author": {
    "name": "Matthew Eernisse",
    "email": "mde@fleegix.org",
    "url": "http://fleegix.org"
  },
  "contributors": [
    {
      "name": "Timothy Gu",
      "email": "timothygu99@gmail.com",
      "url": "https://timothygu.github.io"
    }
  ],
  "license": "Apache-2.0",
  "main": "./lib/ejs.js",
  "repository": {
    "type": "git",
    "url": "git://github.com/mde/ejs.git"
  },
  "bugs": {
    "url": "https://github.com/mde/ejs/issues"
  },
  "homepage": "https://github.com/mde/ejs",
  "dependencies": {},
  "devDependencies": {
    "browserify": "^8.0.3",
    "istanbul": "~0.3.5",
    "jake": "^8.0.0",
    "jsdoc": "^3.3.0-beta1",
    "lru-cache": "^2.5.0",
    "mocha": "^2.1.0",
    "rimraf": "^2.2.8",
    "uglify-js": "^2.4.16"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "test": "mocha",
    "coverage": "istanbul cover node_modules/mocha/bin/_mocha",
    "doc": "rimraf out && jsdoc -c jsdoc.json lib/* docs/jsdoc/*",
    "devdoc": "rimraf out && jsdoc -p -c jsdoc.json lib/* docs/jsdoc/*"
  },
  "_id": "ejs@2.4.1",
  "_shasum": "82e15b1b2a1f948b18097476ba2bd7c66f4d1566",
  "_resolved": "https://registry.npmjs.org/ejs/-/ejs-2.4.1.tgz",
  "_from": "ejs@>=2.4.1 <3.0.0",
  "_npmVersion": "2.10.1",
  "_nodeVersion": "0.12.4",
  "_npmUser": {
    "name": "mde",
    "email": "mde@fleegix.org"
  },
  "maintainers": [
    {
      "name": "tjholowaychuk",
      "email": "tj@vision-media.ca"
    },
    {
      "name": "mde",
      "email": "mde@fleegix.org"
    }
  ],
  "dist": {
    "shasum": "82e15b1b2a1f948b18097476ba2bd7c66f4d1566",
    "tarball": "http://registry.npmjs.org/ejs/-/ejs-2.4.1.tgz"
  },
  "directories": {}
}

},{}],15:[function(require,module,exports){

},{}],16:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":17}],17:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],18:[function(require,module,exports){
/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/

(function () { 'use strict';

// shortcuts for easier to read formulas

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos,
    tan  = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad  = PI / 180;

// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


// date/time constants and conversions

var dayMs = 1000 * 60 * 60 * 24,
    J1970 = 2440588,
    J2000 = 2451545;

function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
function toDays(date)   { return toJulian(date) - J2000; }


// general calculations for position

var e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }


// general sun calculations

function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

function eclipticLongitude(M) {

    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}


var SunCalc = {};


// calculates sun position for a given date and latitude/longitude

SunCalc.getPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};


// sun times configuration (angle, morning name, evening name)

var times = SunCalc.times = [
    [-0.833, 'sunrise',       'sunset'      ],
    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
    [    -6, 'dawn',          'dusk'        ],
    [   -12, 'nauticalDawn',  'nauticalDusk'],
    [   -18, 'nightEnd',      'night'       ],
    [     6, 'goldenHourEnd', 'goldenHour'  ]
];

// adds a custom time to the times config

SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
};


// calculations for sun times

var J0 = 0.0009;

function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {

    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}


// calculates sun times for a given date and latitude/longitude

SunCalc.getTimes = function (date, lat, lng) {

    var lw = rad * -lng,
        phi = rad * lat,

        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),

        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),

        Jnoon = solarTransitJ(ds, M, L),

        i, len, time, Jset, Jrise;


    var result = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon - 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
        time = times[i];

        Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);
        Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};


// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

function moonCoords(d) { // geocentric ecliptic coordinates of the moon

    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
        M = rad * (134.963 + 13.064993 * d), // mean anomaly
        F = rad * (93.272 + 13.229350 * d),  // mean distance

        l  = L + rad * 6.289 * sin(M), // longitude
        b  = rad * 5.128 * sin(F),     // latitude
        dt = 385001 - 20905 * cos(M);  // distance to the moon in km

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        dist: dt
    };
}

SunCalc.getMoonPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec);

    // altitude correction for refraction
    h = h + rad * 0.017 / tan(h + rad * 10.26 / (h + rad * 5.10));

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
        distance: c.dist
    };
};


// calculations for illumination parameters of the moon,
// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

SunCalc.getMoonIllumination = function (date) {

    var d = toDays(date),
        s = sunCoords(d),
        m = moonCoords(d),

        sdist = 149598000, // distance from Earth to Sun in km

        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

    return {
        fraction: (1 + cos(inc)) / 2,
        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
        angle: angle
    };
};


function hoursLater(date, h) {
    return new Date(date.valueOf() + h * dayMs / 24);
}

// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);
    else t.setHours(0, 0, 0, 0);

    var hc = 0.133 * rad,
        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (var i = 1; i <= 24; i += 2) {
        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

        a = (h0 + h2) / 2 - h1;
        b = (h2 - h0) / 2;
        xe = -b / (2 * a);
        ye = (a * xe + b) * xe + h1;
        d = b * b - 4 * a * h1;
        roots = 0;

        if (d >= 0) {
            dx = Math.sqrt(d) / (Math.abs(a) * 2);
            x1 = xe - dx;
            x2 = xe + dx;
            if (Math.abs(x1) <= 1) roots++;
            if (Math.abs(x2) <= 1) roots++;
            if (x1 < -1) x1 = x2;
        }

        if (roots === 1) {
            if (h0 < 0) rise = i + x1;
            else set = i + x1;

        } else if (roots === 2) {
            rise = i + (ye < 0 ? x2 : x1);
            set = i + (ye < 0 ? x1 : x2);
        }

        if (rise && set) break;

        h0 = h2;
    }

    var result = {};

    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);

    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

    return result;
};


// export as AMD module / Node module / browser variable
if (typeof define === 'function' && define.amd) define(SunCalc);
else if (typeof module !== 'undefined') module.exports = SunCalc;
else window.SunCalc = SunCalc;

}());

},{}]},{},[7]);
