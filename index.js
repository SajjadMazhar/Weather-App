let dateTime = document.getElementById("dateTime");
let weatherIcon = document.getElementById("weathericon");
let searchInput = document.querySelector("input");
let searchBtn = document.querySelector("button");
let cardtext = document.querySelector(".card-text").innerHTML;
getAPI("kolkata");
const insertData = (location, weather, temp, minMax, humidity, windSpeed)=>{
    document.getElementById("location").innerHTML = location;
    document.getElementById("weather").innerHTML = weather;
    document.getElementById("temp").innerHTML = temp;
    document.getElementById("maxmin").innerHTML = minMax;
    document.getElementById("humid").innerHTML = humidity;
    document.getElementById("wind").innerHTML = windSpeed;
}

const getCurrentDate = ()=>{
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'Februray', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let d = new Date();
  let date = d.getUTCDate();
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let year = d.getFullYear()
  let hour = d.getHours();
  let minute = d.getMinutes();
  let period = 'AM';
  if (minute < 10) {
      minute = '0' + minute.toString();
  }
  if(hour == 12) {
    period = 'PM';
  }
  if (hour > 12){
    hour -= 12;
    period = 'PM'
  }
  if (hour < 10) {
      hour = '0' + hour.toString();
  }
  if (date < 10) {
      day = '0' + day.toString();
  }
  if (month < 10) {
      month = '0' + month.toString();
  }

  let todayDate = `${day} ${date}, ${month} ${year} | ${hour}:${minute} ${period}.`;
  return todayDate;
}

dateTime.innerHTML = getCurrentDate();
let htmlTimeContent= getCurrentDate();
dateTime.innerHTML = htmlTimeContent;




async function getAPI(city){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb5f6ffe24f31fc8184d357055b8c992`);
    let data = await response.json();
    
    const weatherCondition = data.weather[0].main;
    console.log(weatherCondition);
    
    if (weatherCondition == "Clouds"){
        weatherIcon.innerHTML = `<i class="fas fa-cloud fa-3x" style="color: rgb(235, 235, 235);"></i>`;
      }else if(weatherCondition == "Sunny"){
        weatherIcon.innerHTML = `<i class="fas fa-sun fa-3x" style="color: rgb(252, 227, 5);"></i>`;
      }else if(weatherCondition === "Haze"){
        weatherIcon.innerHTML = `<i class='fas fa-smog fa-3x' style="color:white"></i>`;
      }else if( weatherCondition == "Rain"){
        weatherIcon.innerHTML = `<i class="fas fa-cloud-rain fa-3x" style="color:white"></i>`;
      }else if(weatherCondition == "Clear"){
        weatherIcon.innerHTML = `<i class="fas fa-sun fa-3x" style="color: rgb(252, 227, 5);"></i>`;
      }else{
        weatherIcon.innerHTML = `<i class="fas fa-cloud-rain fa-3x" style="color:white"></i>`;
      }
      let cityCountry = `${data.name}, ${data.sys.country}`;
      let temperature = `${Math.round(data.main.temp - 273)}&#8451;`;
      let minMax = `MIN ${Math.round(data.main.temp_min - 273)}&#8451; | MAX ${Math.round(data.main.temp_max - 273)}&#8451;`
      let humid = `HUMIDITY: ${data.main.humidity}%`
      let speed = `WIND: ${Math.round((data.wind.speed)*(18/5))}km/hr`
      insertData(cityCountry, weatherCondition, temperature, minMax, humid, speed);
}

searchBtn.addEventListener("click", (e)=>{
    e.preventDefault;
    let city = searchInput.value;
    getAPI(city);

})