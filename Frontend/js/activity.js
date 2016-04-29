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