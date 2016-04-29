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