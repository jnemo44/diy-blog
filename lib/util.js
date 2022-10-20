import db from "./db"

export async function getWeather(lat, lon, time) {
    const units = 'imperial'

    // Fetch Weather
    const resWeather = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&appid=${process.env.WEATHER_KEY}&units=${units}`,
        {
            method: 'GET',
        }
    );
    if (!resWeather.ok) {
        //throw new Error(`Error getting weather! status: ${resWeather}`)
        console.log(await resWeather.json())
    }
    
    const weatherInfo = await resWeather.json()
    return weatherInfo

    // Calculate Dewpoint
    //const temp_c = (weatherInfo.main.temp-32)*(5/9)
    //let dewPoint = 243.04*(Math.log(weatherInfo.main.humidity/100)+((17.625*temp_c)/(243.04+temp_c)))/(17.625-Math.log(weatherInfo.main.humidity/100)-((17.625*temp_c)/(243.04+temp_c)))
    //dewPoint = Math.round(dewPoint*(9/5))+32

    // Need to do a push to Strava to update the Description with this info
    //async function updateWeather() {
        // const token = await db.collection('access_tokens')
        // .doc('W50yW2KWMFL2U0XJGbru')
        // .get()
        // const id = await db.collection('strava_data')
        // .doc('hP8d1Y61Id6uQ5B7DgEW')
        // .get()
        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 
        //         'Content-Type': 'application/json', 
        //         Authorization: `Bearer ${token.data().access_token}`},
        //         body: JSON.stringify({ description: dewPoint })
        // };
        //const response = await fetch(`https://www.strava.com/api/v3/activities/{${id.data().object_id}}`, requestOptions);
        //const data = await response.json();
    //}

    // Write weather data to database
    // db.collection('weather_data')
    //   .doc('YhFGHjZz9Yo331xr0ru4')
    //   .update({
    //     temp: weatherInfo.main.temp,
    //     feels_like: weatherInfo.main.feels_like,
    //     pressure: weatherInfo.main.pressure,
    //     humidity: weatherInfo.main.humidity,
    //     wind_speed: weatherInfo.main.wind.speed,
    //     wind_direction: weatherInfo.main.wind.deg,
    //     dew_point: dewPoint,
    // })
}