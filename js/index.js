
let weather = document.getElementById("weather");
let search = document.getElementById("search");


let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let numberDays;
let data;
let result;

async function weatherdata(location = "cairo", num = 1) 
{
  try
   {
    numberDays = num;
    data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=147647f2aad34fe3a1384852241001&q=${location}&days=${num}`
    );
    result = await data.json();
    
    displayWeather()

  }
   catch (error)
    {
    console.log("Error retrieving weather data:", error);
   
  }
}


function displayWeather(){
    let cartona='';
    if (result && result.forecast && result.forecast.forecastday) {
    cartona+=`
    <div class="col-lg-4">
    <div class="card bg-dark h-100 ">
      <div class="card-header text-light bg-black d-flex">
        <p>${
            days[new Date(result.forecast.forecastday[0].date).getDay()]
        }</p>
        <p>${new Date(result.forecast.forecastday[0].date).getDate()}
        ${months[new Date(result.forecast.forecastday[0].date).getMonth()]}
        </p>
      </div>
      <div class="card-body">
        <p class="fs-4 text-light">${result.location.name},${result.location.region},${result.location.country}</p>
        <div class="heat p-3 text-light d-flex justify-content-between">
          <h2 class="fs-1">${result.current.temp_c}&deg;C</h2>
          <img src="https:${result.current.condition.icon}" class="w-25"/>
        </div>
      </div>
      <p class="text-info p-3">${result.current.condition.text}</p>
      <div class="card-footer d-flex justify-content-between text-white">
        
       <span> <i class="fa-solid fa-umbrella"></i> ${result.current.humidity} %</span>
       <span><i class="fa-solid fa-wind"></i> ${result.current.wind_kph} km/h</span>
       <span><i class="fa-solid fa-compass"></i> ${result.current.wind_dir}</span>
      

      <div>
        <i></i>
      </div>
      </div>
    </div>
  </div> 

    `
    weather.innerHTML=cartona;
} }


function searchcity() {
  if (search.value === "") {
    weatherdata();
  } else {
    weatherdata(search.value);
  }
}

async function displayAllData() {
  
  await weatherdata();
 
}

displayAllData();

navigator.geolocation.getCurrentPosition(function (position) {
  let cityLocation = position.coords.latitude + "," + position.coords.longitude;
  (async function () {
    await weatherdata(cityLocation);
  })();
});
