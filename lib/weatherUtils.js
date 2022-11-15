export function windDirection(degrees) {
    if (degrees >= 338 && degrees <= 22) {
        //North
        return 'N'
    }
    else if (degrees >= 23 && degrees <= 67) {
        //North East
        return 'NE'
    }
    else if (degrees >= 68 && degrees <= 112) {
        //East
        return 'E'
    }
    else if (degrees >= 113 && degrees <= 158) {
        //South East
        return 'SE'
    }
    else if (degrees >= 159 && degrees <= 203) {
        //South
        return 'S'
    }
    else if (degrees >= 204 && degrees <= 248) {
        //South West
        return 'SW'
    }
    else if (degrees >= 249 && degrees <= 293) {
        //West
        return 'W'
    }
    else {
        //North West
        return 'NW'
    }
}

export function weatherDescription(description) {
    const words = description.split(" ");

    words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");

    console.log(words)
    return words 
    
}