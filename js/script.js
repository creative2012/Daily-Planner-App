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
        textArea.attr('data-time', time);
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
    //populate fields if local storage data available
    checkLocalStorage('populate');

}
//function to save calender event
function saveToCalender(timeSlot, entry){
    let event = {
        time: timeSlot,
        entry: entry
    };
    //check if data in local storage and return it if so
    let data = checkLocalStorage('save');
    if(data != null){
        //add new event to already stored data
        data.push(event);
    } else {
        //or just add new event
        data = event;
    }
    //save to local storage
    localStorage.setItem('calender', JSON.stringify(data));

}
//function to check local storage data
function checkLocalStorage(type){
    //check if calender data available for current day
    let data = JSON.parse(localStorage.getItem('calender'));
    //logic to populate from data
    if(type == "populate"){
        if (data != null) {
            //if not same day, remove key 
            if(data.date != currentDate){
                localStorage.removeItem('calender');
                return;
            }
            //if found, populate 
            populateFromLocalStorage(data);
            return;
        }
    }
    //logic to check if localStorage data avaialble
    if(type == "save"){
        //if data available add to array and return
        if (data != null) {
            let events = [];
            data.forEach(function (item) {
                toStorage.push(item);
            });
            return events;
        }
        //if no data in local storage
        return null;
    }
    

}
//function to retrive calender event from localStorage
function populateFromLocalStorage(){


}
//Set header Current Day
currentDay.text(currentDate);
//Generate TimeBlocks
generateTimeBlocks();
checkLocalStorage();
//listen for request to save
timeBlockCont.on('click',function(e){
    
    if(e.target.classList.contains('clickEvent')){
        let target = $(this).parent();
        console.log(target);
        let timeSlot = target.childern('data-time').value;
        let entry = target.childern('.event-area').value;
        saveToCalender(timeSlot, entry);
    }
})
