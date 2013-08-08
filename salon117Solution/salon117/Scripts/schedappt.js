
//createAppt - writes to local storage
function createAppt(treatment) {
    var appt = JSON.parse(window.localStorage.getItem(treatment));
    if (!treatment) {
        return [];
    }
   
}
