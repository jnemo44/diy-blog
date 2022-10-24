How to automatically add weather details to any new Strava activity

Objective: Have weather details (specifically dewpoint) added to each strava activity so that when the Florida summer roles around again I will have proof that I suffered lol. Yes there are already apps that do this, but I love building things and this was a great opportunity to learn some new skills and end up with a tool that I’d enjoy using every day! Here is a shot of the finished product…

Stack: Next.js/Firebase/Vercel utilizing Strava APIv3 and OpenWeatherMap
Cost: Free Strava APIv3 and OpenWeather allow 1000 calls/day. Not sure what happens if you hit Strava’s limit, but for OW you start paying after 1,000. For personal activities you’ll be hitting once or twice per day.

Debug Tools used: 
	Postman - Send https requests to test application routes and behaviors
	Ngrok - Quickly give your application an https address to troubleshoot and test
	GraphJSON - Tells me what’s happening on a deployed project. I would use console.log to discover that my lat lon params were missing

Shout out to Strava for maintaining an awesomely detailed API with great documentation and for giving regular users access to their data!

And my intent is not to rob you of the joy of learning and discovering on your own so I won’t be sharing every piece of code.

Okay let’s start.

**Create Strava Application**
If you are a Strava user you can go to your profile settings and create an application...reference application guide

Questions I had…

Does the Website field matter?

Does Callback URL matter? I don’t think so…I think this is just where strava will redirect a user after authentication is complete.

What's an Access Token?

What's a Refresh Token?

The only part you need a database for. I used Firebase, but any database would work. This is where I store my updated tokens allowing me to request new data from Strava.

**Configuring the Webhook**

A webhook. My understanding of “webhooks” before this project was zilch. Again strava documentation FTW. Webhooks allow your application to “subscribe” to events happening off app and perform some action when triggered. In our case we want to subscribe to Strava push events and use that as our trigger to go and GET our weather information. This is a one time setup event to link your application to Strava push events. Enter Postman. I suppose you could code this up, but I just used postman...

1. A `POST` request to: `https://www.strava.com/api/v3/push_subscriptions?client_id=lookup_on_strava&client_secret=lookup_on_strava&callback_url=https://yourwebsite.com/webhook&verify_token=make_up_a_verify_token`

    Response if successful: `{
    "id": XXXXXXX
    }`

2. You now can check the status of your subscription by issuing a `GET` request: `https://www.strava.com/api/v3/push_subscriptions?client_id=lookup_on_strava&client_secret=lookup_on_strava`
   
   Response if succesful: `[
    {
        "id": XXXXXX,
        "resource_state": 2,
        "application_id": XXXXX,
        "callback_url": "https://yourwebsite.com/webhook",
        "created_at": "2022-10-15T03:36:24+00:00",
        "updated_at": "2022-10-15T03:36:24+00:00"
    }
]`

This is where ngrok came into play for testing. I simply put a conditional in my /webhook route `if (req.method === 'POST') 
{object_id: req.body.object_id,
        object_type: req.body.object_type,
        aspect_type: req.body.aspect_type,
        event_time: req.body.event_time,
        owner_id: req.body.owner_id,
        subscription_id: req.body.subscription_id,
        update_date: currentDate,
        updates: req.body.updates,}`


**Requesting Scope (Important!!!)** 

This is the piece that caused the most head scratching as I knew my webhook was configured correctly, but I was never getting any POST requests from strava when I uploaded new activities! It was frustrating. After about two weeks I was re reading xxxx and 

**GET Weather for any new activity**

I chose OpenWeather because of their free tier (1000 calls/day) and after a brief look at their docs I was able to find the request I wanted to make. I would make a historical request using the latitude, longitude, and time from my recently uploaded strava activity data...

`CODE SNIPPET`

**Push update to the new Strava activity with weather info in description!**

Okay so now we have our activity and we have our weather info. Let's make the PUT request to Strava.

`CODE SNIPPET`