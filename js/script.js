const currentDay = $('#currentDay');
const timeBlockCont = $('.SchedContainer');
var localStorageData = '';
const currentDate = moment().format('dddd, Do MMMM YYYY');
const current = moment().hours();

//function to check which class to add
function getHourClass(i) {

    //check class for text input area
        let className = 'event-area';

        if (i < current) {
            className += ' past';
        } else if (i == current) {
            className += ' present';
        } else {
            className += ' future';
        }
        return className;

}
//Function to generate time blocks
function generateTimeBlocks() {

    let time = 9;

    for (var i = 0; i < 9; i++) {

        //create the Elements
        let timeBlock = $('<div>');
        let hour = $('<div>');
        let textArea = $('<textarea>');
        let saveBtn = $('<div>');
        let icon = $('<i>');
        //Add classes
        timeBlock.addClass('timeBlock');
        hour.addClass('hour');
        textArea.addClass(getHourClass(i));
        saveBtn.addClass('saveBtn clickEvent');
        icon.addClass('fa fa-cloud-upload-alt clickEvent');
        //append to page
        let hourText = i < 3 ? 'AM' : 'PM';
        hour.text(time + hourText)
        saveBtn.append(icon);
        timeBlock.append(hour).append(textArea).append(saveBtn);
        timeBlockCont.append(timeBlock);
        
        time < 12 ? time++ : time = 1;
    }

}
//function to save calender event
function saveToCalender(){

}
//function to check local storage data
function checkLocalStorage(){
    //check if calender data available for current day
    let data = JSON.parse(localStorage.getItem('calender'));
    if (data != null) {
        if(data.date != currentDate){
            data = null;
            localStorage.removeItem('calender');
        }
    }
    console.log(data);
    return data;

}
//function to retrive calender event from localStorage
function getFromLocalStorage(){

    if(checkLocalStorage() != null){

    }

}
//Set header Current Day
currentDay.text(currentDate);
//Generate TimeBlocks
generateTimeBlocks();
checkLocalStorage();
//listen for request to save
timeBlockCont.on('click',function(e){
    if(e.target.classList.contains('clickEvent')){
        saveToCalender();
    }
})
