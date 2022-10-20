// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../lib/db";
import { getWeather } from "../../lib/util";

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
          //console.log('WEBHOOK_VERIFIED');
          res.json({ "hub.challenge": challenge });
        } else {
          // Responds with '403 Forbidden' if verify tokens do not match
          return res.status(403);
        }
      }
    } else if (req.method === 'POST') {
      // Handle webhook PUSH
      // Write webhook content to db
      await db.collection('strava_data')
      .doc('hP8d1Y61Id6uQ5B7DgEW')
      .update({
        object_id: req.body.object_id,
        object_type: req.body.object_type,
        aspect_type: req.body.aspect_type,
        event_time: req.body.event_time,
        owner_id: req.body.owner_id,
        subscription_id: req.body.subscription_id,
        update_date: currentDate,
        updates: req.body.updates,
      })

      // If aspect_type is 'create' && run && probably some other things GET strava activity by object ID
      if (req.body.aspect_type === 'create') {
        const token = await db.collection('access_tokens').doc('W50yW2KWMFL2U0XJGbru').get()
        const newestActivity = await fetch(
          `https://www.strava.com/api/v3/activities/${req.body.object_id}`,
          {
            headers: {
              Authorization: `Bearer ${token.data().access_token}`,
            },
          },
        )
        const activityData = await newestActivity.json()
        const time = new Date(activityData.start_date).getTime()
        // If aspect_type is create then get weather for that time
        let weather = await getWeather(activityData.start_latlng[0], activityData.start_latlng[1], time/1000)
        // Form a PUT request to update the new activity with weather info
        const updateActivity = await fetch(
          `https://www.strava.com/api/v3/activities/${req.body.object_id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token.data().access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"description": `🌡️ Temp: ${Math.round(weather.data[0].temp)}F  💧 Dew Point: ${Math.round(weather.data[0].dew_point)}F  ✨ Felt Like: ${Math.round(weather.data[0].feels_like)}F\r`}),
            //🏁 Temp: ${Math.round(weather.data[0].temp)}F Dew Point: ${Math.round(weather.data[0].dew_point)}F Felt Like: ${Math.round(weather.data[0].feels_like)}F
          },
        )
      }
      

      
      
      
      res.status(200).json({ message: 'Success!' });
  
    }
    else {
      // Handle any other HTTP method
      db.collection('error_data')
      .doc('dVO9Otfq4yBAdR4dkHBU')
      .update({
        error: currentDate,
      })
      return res.status(400).json(currentDate);
    }
    
}


