let apiKey = "&appid=505bc59551e545ee228f440eb0aa0ff2"
let cities = localStorage.getItem("cities")
let today= moment().format("LL")

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
                
                // Day One
                tempF1 = (forecastRes.list[2].main.temp-273.15) * 1.80 +32;
                $("#temp1").text(tempF1.toFixed(0));
                $("#humid1").html(forecastRes.list[2].main.humidity)
                
                // UNABLE TO GET DATE TO WORK!
                var dateOne = moment().format("LL");
                $("#date1").text(dateOne)

                
                // Day Two
                tempF2 = (forecastRes.list[9].main.temp-273.15) * 1.80 +32;
                $("#temp2").text(tempF2.toFixed(0));
                $("#humid2").html(forecastRes.list[9].main.humidity)

                // Day Three
                tempF3 = (forecastRes.list[17].main.temp-273.15) * 1.80 +32;
                $("#temp3").text(tempF3.toFixed(0));
                $("#humid3").html(forecastRes.list[17].main.humidity)

                // Day Four
                tempF4 = (forecastRes.list[25].main.temp-273.15) * 1.80 +32;
                $("#temp4").text(tempF4.toFixed(0));
                $("#humid4").html(forecastRes.list[25].main.humidity)
                
                // Day Five
                tempF5 = (forecastRes.list[33].main.temp-273.15) * 1.80 +32;
                $("#temp5").text(tempF5.toFixed(0));
                $("#humid5").html(forecastRes.list[33].main.humidity)
                


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