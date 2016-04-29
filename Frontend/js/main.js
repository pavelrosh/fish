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