let apiKey = "&appid=505bc59551e545ee228f440eb0aa0ff2"


// One Day Forecast
$("#search-input").on("click", function(event){
    event.preventDefault();

    var city= $("#search-input").val().trim();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(queryURL);
        console.log(response);
        
        $(".card-title").text(response.name)
        $("#humid").text(response.main.humidity)
        $("#wind").text(response.wind.speed)

        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $("#temp").text(tempF.toFixed(0));

        currentLat=response.coord.lat;
        currentLon=response.coord.lon;

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=505bc59551e545ee228f440eb0aa0ff2"+"&lat="+currentLat + "&lon=" + currentLon,
        method: "GET"})
        .then(function(responseUV){
            $("#uv").text(responseUV.value)
        })


    })
})