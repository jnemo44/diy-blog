//import db from '../lib/db'
import {supabase} from "../lib/supabasedb";

export async function fetchStravaActivity(objectID, accessToken) {
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
    //console.log(stravaOwnerID)
    // Fetch Refresh Token
    const profile = await supabase
        .from('profiles')
        .select()
        .eq('strava_owner_id', stravaOwnerID)
    
    if (profile.error) {
        const message = `An error has occured when trying to update Strava Token`;
        throw new Error(message);
    }
    
    let refresh_token = profile.data[0].strava_refresh_token

    const response = await fetch(
        `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.CLIENT_ID_STRAVA}&client_secret=${process.env.CLIENT_SECRET_STRAVA}&grant_type=refresh_token&refresh_token=${refresh_token}`,
        {
            method: 'POST',
        },
    )

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
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

    if (updateResponse.error) {
        const message = `ERROR in updateStravaTokens`;
        throw new Error(message);
    }

    return accessToken
}
// import db from '../lib/db'

// export async function fetchStravaActivity(objectID, token) {
//     const response = await fetch(
//         `https://www.strava.com/api/v3/activities/${objectID}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         },
//     )
//     if (!response.ok) {
//         const message = `An error has occured: ${response.status}`;
//         throw new Error(message);
//     }
//     const stravaActivity = await response.json()

//     return stravaActivity
// }

// export async function updateStravaTokens() {
//     const entries = await db.collection('access_tokens').get()
//     let [{ access_token, refresh_token }] = entries.docs.map(entry => entry.data())
//     const response = await fetch(
//         `https://www.strava.com/api/v3/oauth/token?client_id=${process.env.CLIENT_ID_STRAVA}&client_secret=${process.env.CLIENT_SECRET_STRAVA}&grant_type=refresh_token&refresh_token=${refresh_token}`,
//         {
//             method: 'POST',
//         },
//     )

//     if (!response.ok) {
//         const message = `An error has occured: ${response.status}`;
//         throw new Error(message);
//     }
//     const {
//         access_token: newToken,
//         refresh_token: newRefreshToken,
//     } = await response.json()

//     // Put the new tokens into the db
//     db.collection('access_tokens')
//         .doc('W50yW2KWMFL2U0XJGbru')
//         .update({
//             access_token: newToken,
//             refresh_token: newRefreshToken,
//         })

//     return newToken
// }

