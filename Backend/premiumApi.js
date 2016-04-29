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

function JSONP_MarineWeather(input) {
    var url = _PremiumApiBaseURL + "marine.ashx?q=" + input.query + "&format=" + input.format + "&fx=" + input.fx + "&key=" + _PremiumApiKey;

    jsonP(url, input.callback);
}

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
            console.log('json');
            console.log(callback);
        },
        error: function (e) {
            console.log(e.message);
        }
    });
}
