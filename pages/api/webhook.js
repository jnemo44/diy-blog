// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../lib/db"


export default function handler(req, res) {
  var currentDate = new Date().toString()  
  if (req.method === 'GET') {
      console.log('GET')
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
          console.log('WEBHOOK_VERIFIED');
          res.json({ "hub.challenge": challenge });
        } else {
          // Responds with '403 Forbidden' if verify tokens do not match
          return res.status(403);
        }
      }
    } else if (req.method === 'POST') {
      // Handle webhook PUSH
      console.log(req.body);
      //db.settings({ ignoreUndefinedProperties: true })
      db.collection('strava_data')
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
      return res.status(200).json(currentDate);    
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


