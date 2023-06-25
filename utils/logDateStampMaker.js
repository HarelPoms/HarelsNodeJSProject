const makeLogDateStamp = () => {
    let dateSample = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
    let dateSample2 = new Date();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let monthNum = new Date(Date.parse(dateSample[1] +" 1, 2012")).getMonth() + 1;
    let normalizedTime = "GMT" + dateSample[5].slice(0,3) + ":" + dateSample[5].slice(3);
    return( dateSample2.toLocaleDateString('en-US', {weekday: 'long'}) + " " + dateSample[2]+'/'+monthNum+'/'+dateSample[3]+' '+dateSample[4]+' '+ normalizedTime + " " + timeZone );
}

module.exports = {makeLogDateStamp};