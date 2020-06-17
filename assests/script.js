let apiKey = "&appid=505bc59551e545ee228f440eb0aa0ff2"
let cities = localStorage.getItem("cities")
    if(cities === null){
        cities = []
    }else{
        cities = cities.split(", ");
        renderButtons();
    }
    function renderButtons(){
        var cityListEl= $("#cityList")
        cityListEl.empty()
        var condition = cities.length
        if(condition > 5){
            condition = 5
        }
        for(var i = 0; i < condition; i++){
            var button= $("<button>").text(cities[i])
            button.addClass("cities")
            cityListEl.append(button)
        }
    }
function getWeather(city){
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response){
            // console.log(queryURL);
            // console.log(response);
            
            cities.unshift(response.name);

            renderButtons();

            var local=cities.join(", ")
            localStorage.setItem("cities", local)

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
        
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=505bc59551e545ee228f440eb0aa0ff2",
            method: "GET"})
            .then(function(forecastRes){
                console.log(forecastRes)
                
                tempF1 = (forecastRes.list[2].main.temp-273.15) * 1.80 +32;
                $("#temp1").text(tempF1.toFixed(0));
                $("#humid1").html(forecastRes.list[2].main.humidity)
                // var dateOne= moment()
                // .add(1,"days")
                // .format("L");
                // $("#date1").text(dateOne);

                // var icond5dayPath1=forecastRes.list[2].weather[0].icon;
                // var icon5dayURL1 = "https://openweathermap.org/img/wn/" + icond5dayPath1 +"@2x.png";

                // var iconDay1= $("<img>");
                // iconDay1.attr("src", icon5dayURL1);
                // $("#icon1").text(iconDay1);
            })

    })
}

    // One Day Forecast
$("#searchBtn").on("click", function(event){
    event.preventDefault();
    
    var city= $("#search-input").val().trim();
    getWeather(city);
    

   

})

$(document).on("click", ".cities",function(e){
    var city = $(this).text()
    getWeather(city)
})