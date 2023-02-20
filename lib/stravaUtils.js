//import db from '../lib/db'
import {supabase} from '../lib/supabasedb'
//import { useSupabaseClient } from '@supabase/auth-helpers-react'

export async function fetchStravaActivity(objectID, accessToken) {
    console.log('In Function')
    console.log(objectID)
    const response = await fetch(
        `https://www.strava.com/api/v3/activities/${objectID}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    )
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
    const stravaActivity = await response.json()

    return stravaActivity
}

export async function updateStravaTokens( stravaOwnerID ) {
    // Fetch Refresh Token
    const profile = await supabase
        .from('profiles')
        .select()
        .eq('strava_owner_id', stravaOwnerID)

    if (profile.error) {
        const message = `An error has occured when trying to update Strava Token`;
        throw new Error(message);
    }
    
    //let refresh_token = profile.data.code
    let refresh_token = profile.data[0].strava_refresh_token
    let units = profile.data[0].units

    const response = await fetch(
        `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.CLIENT_ID_STRAVA}&client_secret=${process.env.CLIENT_SECRET_STRAVA}&grant_type=refresh_token&refresh_token=${refresh_token}`,
        {
            method: 'POST',
        },
    )

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.log("STRAVA POST REQUEST ERROR")
        throw new Error(message);
    }
    const {
        access_token: accessToken,
        refresh_token: newRefreshToken,
    } = await response.json()

    let strava_refresh_token = newRefreshToken
    let strava_access_token = accessToken

    // Put the new tokens into the db
    const updateResponse = await supabase
        .from('profiles')
        .update({ strava_refresh_token, strava_access_token})
        .eq('strava_owner_id', stravaOwnerID)

    if(updateResponse.error) {
        console.log("ERROR in updateStravaTokens")
    }

    return { accessToken, units }
}

