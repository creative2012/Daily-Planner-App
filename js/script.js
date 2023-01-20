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
        //add data attribute
        textArea.attr('data-time', time);
        saveBtn.attr('data-time', time);
        icon.attr('data-time', time);
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
function saveToCalender(timeSlot, text){
    let event = {
        time: timeSlot,
        entry: text
    }
    
    //check if data in local storage and return it if so
    let data = checkLocalStorage('save');
    if(data != null){
        let test = false;
        //add new event to already stored data
        for (i = 1; i < data.length; i++) {
            if(data[i].time == event.time){
                data[i].entry = event.entry;
                test = true;
            }
        } 
        if(!test){
            data.push(event);
        }
        
    } else {
        //or just add new event
        data = [
            currentDate,
            event
        ]
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
            if(data[0] != currentDate){
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
                events.push(item);
            });
            return events;
        }
        //if no data in local storage
        return null;
    }
    

}
//function to retrive calender event from localStorage
function populateFromLocalStorage(data){
    for (i = 1; i < data.length; i++) {
        $('textarea[data-time='+data[i].time+']').val(data[i].entry);
    };

}
//Set header Current Day
currentDay.text(currentDate);
//Generate TimeBlocks
generateTimeBlocks();
checkLocalStorage();
//listen for request to save
timeBlockCont.on('click',function(e){
    if(e.target.classList.contains('clickEvent')){
        let timeSlot = e.target.dataset.time;
        let entry = $('textarea[data-time='+timeSlot+']').val();
        saveToCalender(timeSlot, entry);
    }

})
