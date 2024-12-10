export function getUserTime(date: Date){
    const time = new Date()
    const timeAdded = new Date(date)
    let timeInBetween = time.setMilliseconds(0) - timeAdded.setMilliseconds(0)
    if (Math.floor(timeInBetween/1000) < 60){
      timeInBetween = Math.floor(timeInBetween/1000)
      if (timeInBetween < 10){
        return `less than 10 seconds`
      }
      return `${timeInBetween} seconds`
    }
    else if (Math.floor(timeInBetween/60000) < 60){
      timeInBetween = Math.floor(timeInBetween/60000)
      if (timeInBetween < 2){
        return `1 minute`
      }
      return `${timeInBetween} minutes`
    }
    else if (Math.floor(timeInBetween/3.6e+6) < 24){
      timeInBetween = Math.floor(timeInBetween/3.6e+6)
      if (timeInBetween < 2){
        return `1 hour`
      }
      return `${timeInBetween} hours`
    }
    else if (Math.floor(timeInBetween/8.64e+7) < 7){
      timeInBetween = Math.floor(timeInBetween/8.64e+7)
      if (timeInBetween < 2){
        return `1 day`
      }
      return `${timeInBetween} days`
    }
    else if (Math.floor(timeInBetween/6.048e+8) < 4){
      timeInBetween = Math.floor(timeInBetween/6.048e+8)
      if (timeInBetween < 2){
        return `1 week`
      }
      return `${timeInBetween} weeks`
    }
    else if (Math.floor(timeInBetween/2.628e+9) < 12){
      timeInBetween = Math.floor(timeInBetween/2.628e+9)
      if (timeInBetween < 2){
        return `1 month`
      }
      return `${timeInBetween} months`
    }
    else if (Math.floor(timeInBetween/3.154e+10) >= 1){
      timeInBetween = Math.floor(timeInBetween/3.154e+10)
      if (timeInBetween < 2){
        return `1 year`
      }
      return `${timeInBetween} years`
    }
}

export function getUserImage(){
    return `https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * 826) + 1}.jpeg`
    }
  