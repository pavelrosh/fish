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


