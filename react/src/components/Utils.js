export function getAverageOdds(sites) {
    let team1 = 0
    let team2 = 0
    let draw = 0
    let count = 0

    for (const [index, value] of sites.entries()) {
        team1 += value.odds.h2h[0]
        team2 += value.odds.h2h[1]
        if (value.odds.h2h.length > 2) {
            draw += value.odds.h2h[2]
        }
        count++
    }
    return [team1 / count, team2 / count, draw / count]
}

export function decimalOddsToProbability(odds) {
    return (1 / odds * 100)
}

export function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    
    var amOrPm = hour >= 12 ? 'pm' : 'am';
    hour = (hour % 12) || 12;

    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + " " + amOrPm;
    return time;
  }