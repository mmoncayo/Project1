$(document).ready(function () {
    var jobKeyword = $("#keyword").val().trim();
    var location = $("#cityWeather").val().trim().split(" ").join("+");
    //var jobQuery= "https://jobs.github.com/positions.json?description=" + jobKeyword + "&location=" + location;
    function jobSearch(jobQuery) {
        console.log("jobQuery: ", jobQuery);
        $.ajax({
            url: jobQuery,
            method: "GET",
            dataType: 'jsonp',
        })
            .then(function (jobData) {
                // confirm if ajax call pulled the right data (i.e., job openings and city location) 
                console.log(jobData.title);
                console.log(jobData.location);
            })
    }
    var authKey = "60491f0ae881db1d21b8fc251fe7e947"
    function runQuery(newLink) {
        console.log("newLink", newLink)
        $.ajax({
            url: newLink,
            method: "GET"
        })
            .then(function (WeatherData) {
                // $("#weatherSection").empty();
                //start dumping to html
                var sectionCard = $("<div>");
                sectionCard.addClass("card");
                sectionCard.attr("id", "articleCard");
                sectionCard.addClass("border border-secondary");
                $("#weatherSection").append(sectionCard);
                //attach the content the appropiate well
                $("#articleCard").append("<h3>" + ((WeatherData.list[1].main.temp - 273.15) * 9 / 5 + 32).toFixed(2) + " </h3>");
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
        var jobTerm = $("#keyword").val();
        //add in the search term
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + queryTerm + "&appid=" + authKey;
        var jobQueryURL = "https://jobs.github.com/positions.json?description=" + jobTerm + "&location=" + queryTerm;
        runQuery(queryURL);
        jobSearch(jobQueryURL);
    })
    $("#clear").on("click", function (event) {
        event.preventDefault();
        $("#citySection").empty();
        $("#weatherSection").empty();
        $("#jobCity").empty();
    })
});