//import db from '../lib/db'
import {supabase} from '../lib/supabasedb'
//import { useSupabaseClient } from '@supabase/auth-helpers-react'

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
    //const supabase = useSupabaseClient()
    console.log(stravaOwnerID)
    // Fetch Refresh Token
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('strava_owner_id', stravaOwnerID)
    
    let refresh_token = data?.data?.code

    console.log(data)

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
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
    } = await response.json()

    // Put the new tokens into the db
    const { errorToken } = await supabase
        .from('profiles')
        .update({ strava_refresh_token: newRefreshToken, strava_access_token: newToken })
        .eq('strava_owner_id', stravaOwnerID)

    return newAccessToken
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
//
//     if (!response.ok) {
//         const message = `An error has occured: ${response.status}`;
//         throw new Error(message);
//     }
//     const {
//         access_token: newToken,
//         refresh_token: newRefreshToken,
//     } = await response.json()
//
//     // Put the new tokens into the db
//     db.collection('access_tokens')
//         .doc('W50yW2KWMFL2U0XJGbru')
//         .update({
//             access_token: newToken,
//             refresh_token: newRefreshToken,
//         })
//
//     return newToken
// }

