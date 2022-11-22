
export async function fetchStravaActivity (objectID, token) {
    const response = await fetch(
        `https://www.strava.com/api/v3/activities/${objectID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.log(message);
        throw new Error(message);
    }
    const stravaActivity = await response.json()

    return stravaActivity
}

