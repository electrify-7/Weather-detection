const apikey = "<add-your-own-api-key>";


function numtomonth(value) {
   switch(value){
         case 1: return "January";
         case 2: return "February";
         case 3: return "March";
         case 4: return "April";
         case 5: return "May";
         case 6: return "June";
         case 7: return "July";
         case 8: return "August";
         case 9: return "September";
         case 10: return "October";
         case 11: return "November";
         case 12: return "December";
   }
}



function getLocation() {
   return new Promise((resolve , reject) =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve,reject);
      } else {
        reject("Geolocation is not supported by this browser.");
      }
   });
}

function showPosition(position) {
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   console.log("Latitude: " + latitude + ", Longitude: " + longitude);
}

getLocation()
            .then(position => {
               const latitude = position.coords.latitude;
               const longitude = position.coords.longitude;
               getWeatherData(latitude,longitude);
            })
            .catch(error =>{
               window.alert("Kindly provide location permissions");
            });




async function getWeatherData(lat, lon){
     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

     const data = await fetch(url);
     const datafile = await data.json();
     display(datafile);
};         

function display(datafile){
   const{
      name: city,
      main: {feels_like,temp,pressure, humidity},
      sys: {country},
      weather: [{description,id}],
      timezone: time,
      visibility: visible,
      wind: {deg,speed}
   } = datafile;
   

   const humidity_value = document.getElementById("humidity");
   const pressure_value = document.getElementById("pressure");
   const windspeed = document.getElementById("windspeed");
   const winddirection = document.getElementById("winddirection");
   const visibility_value = document.getElementById("visibility");
   humidity_value.textContent = humidity + "%";
   pressure_value.textContent= (pressure/1000).toFixed(2) + "b";
   windspeed.textContent = (speed * 18 / 5).toFixed(1) + "kph";
   
      let directionControl = 22.5;
      {
         if(directionControl <= deg && deg <= directionControl + 45){
               winddirection.textContent = "NE";
         }
         else if(directionControl+45 < deg && deg < directionControl+90){
               winddirection.textContent = "E";
         }
         else if(directionControl+90 <= deg && deg <= directionControl + 135){
               winddirection.textContent = "SE";
         }
         else if(directionControl+135 < deg && deg < directionControl + 180){
               winddirection.textContent = "S";
         }
         else if(directionControl+180 <= deg && deg <= directionControl + 225){
               winddirection.textContent = "SW";
         }
         else if(directionControl+225 < deg && deg < directionControl + 270){
               winddirection.textContent = "W";
         }
         else if(directionControl+225 < deg && deg < directionControl + 270){
               winddirection.textContent = "NW";
         } 
         else{
            winddirection.textContent = "N";
         }
      }
   visibility_value.textContent = (visible/1000).toFixed(1) + "km";

   const country_value = document.getElementById("country");
   const dateandtime = document.getElementById("dateandtime");
   const images = document.querySelector(".images");
   const temperature = document.getElementById("temperature");
   const cloud = document.getElementById("cloud");

   if(country === "IN") country_value.textContent = "India";
   else country_value.style.display = "none";

   const date_value = new Date();
   let date_of_month = date_value.getDate();
   let month = numtomonth(date_value.getMonth()+1);
   let year_value = date_value.getFullYear();

   dateandtime.textContent = `${date_of_month} ${month} , ${year_value}`;  
   let temp_value = Math.floor(temp - 273.16);
   let feel_value = Math.floor(feels_like - 273.16);
   temperature.textContent = `${temp.toFixed(1)}K / Feels like ${feel_value}°`;
   cloud.textContent = `~${description}~`;
   let icon = "";

         if (200 <= id && id < 300) {
            icon = "⛈️";
         } else if (300 <= id && id < 400) {
            icon = "🌧️";
         } else if (400 <= id && id < 500) {
            icon = "aa";
         } else if (500 <= id && id < 600) {
            icon = "🌦️";
         } else if (600 <= id && id < 700) {
            icon = "❄️";
         } else if (700 <= id && id < 800) {
            icon = "🌀";
         } else if (800 <= id && id < 900) {
            icon = "☀️";
         }
   images.textContent = icon;
   images.append(`${temp_value}°`);
   console.log(datafile);
}


