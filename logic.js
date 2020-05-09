$(document).ready(function () {

    var authKey = "60491f0ae881db1d21b8fc251fe7e947"

    function runQuery(newLink) {
        console.log("newLink", newLink)

        $.ajax({
            url: newLink,
            method: "GET"
        })
            .then(function (WeatherData) {

                //start dumping to html
                var sectionCard = $("<div>");
                sectionCard.attr("id", "articleCard");
                $("#weatherSection").append(sectionCard);
                //attach the content the appropiate well
                $("#articleCard").append("<h3>" + ((WeatherData.list[1].main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + "°F" + " </h3>");
                $("#articleCard").append("<h3>" + "Overcast" + "</h3>" + "<img src=" + "http://openweathermap.org/img/wn/" + WeatherData.list[2].weather[0]['icon'] + "@2x.png"  + ">");
                $("#articleCard").append("<h3>" + " Humidity: " + WeatherData.list[1].main.humidity + "%" + " </h3>");
                console.log(WeatherData.list[2].weather[0]['icon'])
                $("#articleCard").append("<h3>" + WeatherData.city.name + "</h3>");
                // how can i add a class to the newly appended <h3>

            });
    }

    $("#search").on("click", function (event) {
        event.preventDefault();
        // get search term
        var queryTerm = $("#cityWeather").val().trim().split(" ").join("+");
        //   if(queryTerm.length>1){
        //     queryTerm = queryTerm.join("+");
        //   };
        console.log(queryTerm);

        //add in the search term
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + queryTerm + "&appid=" + authKey;

        runQuery(queryURL);
    })
    $("#clear").on("click", function (event) {
        event.preventDefault();
        $("#citySection").empty();
        $("#weatherSection").empty();


    })

});