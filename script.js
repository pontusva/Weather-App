const token = config.api

const weather = {
    fetchWeather: function(city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid='+ token + '&lang=sv', {
            method: 'GET'
        })
        .then((response) => {
            if (!response.ok) {
                alert('Enter a valid City')
                throw new Error('error')
            }
            return response.json()
        })
        .then((data) => {
            console.log(data)
            return this.displayWeather(data);
        })
    },
    displayWeather: function (data) {
        const { icon, description } = data.weather[0] 
        const { name } = data;
        const { temp } = data.main;
        const { feels_like } = data.main;
        const { speed } = data.wind

        document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.getElementById('description').innerHTML = description
        document.getElementById('city').innerHTML = 'Vädret i ' + name + ' just nu'
        document.getElementById('temp').innerHTML = temp + ' °C'
        document.getElementById('feels-like').innerHTML ='Men det känns som ' + feels_like + ' °C'
        document.getElementById('wind-speed').innerHTML = 'och det blåser i ' + speed + ' m/s';
        document.querySelector('.flex-container-1').style.backgroundImage =
      "url('https://source.unsplash.com/1920x1024/?" + name + "')";

    },
   search: function() {
       this.fetchWeather(document.getElementById('input').value);
   }
}

document.getElementById("button").addEventListener("click", function () {
    weather.search();
  });


  document.getElementById("input").addEventListener("keyup", function (e) {
    if (e.key === 'Enter') {
        weather.search()
    }
  });

weather.fetchWeather('Stockholm');