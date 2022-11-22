// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../lib/db";
import { windDirection, weatherDescription, getWeather } from "../../lib/weatherUtils";
import { fetchStravaActivity } from "../../lib/stravaUtils";

export default async function handler(req, res) {
  var currentDate = new Date().toString()
  if (req.method === 'GET') {
    // Process a GET request
    // Parses the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Verifies that the mode and token sent are valid
      if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        res.json({ "hub.challenge": challenge });
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        return res.status(403);
      }
    }
  } else if (req.method === 'POST') {
    if (req.body.subscription_id !== 227223) {
      console.log("Incorrect API Key!")
      return (res.status(401).json({ message: "Incorrect API Key! You cannot access this item." }))
    }
    // Correct API KEY continue
    else {
      // If aspect_type is 'create' && run && probably some other things GET strava activity by object ID
      if (req.body.aspect_type === 'create' || req.body.aspect_type === 'update') {
        const token = await db.collection('access_tokens').doc('W50yW2KWMFL2U0XJGbru').get()
        const activityData = await fetchStravaActivity(req.body.object_id, token.data().access_token)
        // Use start time to pull weather data
        const time = new Date(activityData.start_date).getTime()
        if (typeof activityData.start_latlng !== 'undefined') {
          // If aspect_type is create then get weather for that time
          const weather = await getWeather(activityData.start_latlng[0], activityData.start_latlng[1], time / 1000)
          const weatherDetail = weatherDescription((weather.data[0].weather[0].description))
          console.log(weatherDetail)
          console.log(weather.data[0])
          //Check to see if weather pulled succesfully
          // Form a PUT request to update the new activity with weather info
          const updateActivity = await fetch(
            `https://www.strava.com/api/v3/activities/${req.body.object_id}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token.data().access_token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ "description": `🌡️ Temp: ${Math.round(weather.data[0].temp)}F  💧 Dew Point: ${Math.round(weather.data[0].dew_point)}F  ✨ Felt Like: ${Math.round(weather.data[0].feels_like)}F\r💨 Winds out of the ${windDirection(Math.round(weather.data[0].wind_deg))} ${Math.round(weather.data[0].wind_speed)}mph ${'wind_gust' in weather.data[0] ? 'gusting to ${Math.round(weather.data[0].wind_gust)}mph' : ''}` }),
            },
          )
          if (updateActivity.status >= 200 && updateActivity.status <= 299) {
            res.status(200).json({ message: 'Success!' });
          }
          // Strava activity did not update succesfully
          else {
            console.log("Strava activity did not update successfully")
            res.status(500).json({ message: "Strava activity did not update successfully", status: updateActivity.status, statusText: updateActivity.statusText })
          }
        }
        else {
          console.log("No Lat Long from Strava")
          res.status(500).json({ message: 'No lat long recieved from Strava! Upload an outdoor activity that includes lat long' });
        }
      }
      else {
        console.log("Not a 'create' activity.")
        res.status(200).json({ message: "Not a 'create' activity." })
      }
    }
  }
  else {
    console.log("Not a POST request")
    // Handle any other HTTP method
    db.collection('error_data')
      .doc('dVO9Otfq4yBAdR4dkHBU')
      .update({
        error: currentDate,
      })
    return res.status(400).json({ message: currentDate });
  }

}


