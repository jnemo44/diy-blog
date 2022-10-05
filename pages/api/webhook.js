// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from "../../lib/db"


export default function handler(req, res) {
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
        console.log('WEBHOOK_VERIFIED');
        res.json({ "hub.challenge": challenge });
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }

  } else if (req.method === 'POST') {
    // Handle webhook PUSH
    console.log(req)
    console.log(req.updates)
    console.log(req.event_time)
    console.log(req.object_id)

    db.collection('strava_data')
    .doc('hP8d1Y61Id6uQ5B7DgEW')
    .update({
      object_id: req.object_id,
      request: req,
    })
    
  }
  else {
    // Handle any other HTTP method
    db.collection('error_data')
    .doc('dVO9Otfq4yBAdR4dkHBU')
    .update({
      error: req,
    })
  }
}


