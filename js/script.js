const currentDay = $('#currentDay');
const timeBlockCont = $('.SchedContainer');
const currentDate = moment().format('dddd, Do MMMM YYYY');
const current = moment().hours();
const feedback = $('#feedback');

//function to check which class to add
function getHourClass(hour) {

    //check class for text input area
    let className = 'event-area';
    console.log(hour);
    console.log(current);
    if (hour < current) {
        className += ' past';
    } else if (hour == current) {
        className += ' present';
    } else {
        className += ' future';
    }
    return className;

}
//Function to generate time blocks
function generateTimeBlocks() {

    let time = 9;
    let check =9;

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
        textArea.addClass(getHourClass(check));
        saveBtn.addClass('saveBtn clickEvent');
        icon.addClass('fa fa-cloud-upload-alt clickEvent');
        //add data attribute
        let hourText = i < 3 ? 'AM' : 'PM';
        textArea.attr('data-time', time + hourText);
        saveBtn.attr('data-time', time + hourText);
        icon.attr('data-time', time + hourText);
        //append to page

        hour.text(time + hourText)
        saveBtn.append(icon);
        timeBlock.append(hour).append(textArea).append(saveBtn);
        timeBlockCont.append(timeBlock);

        time < 12 ? time++ : time = 1;
        check++;
    }
    //populate fields if local storage data available
    checkLocalStorage('populate');

}
//function to save calender event
function saveToCalender(timeSlot, text) {
    let event = {
        time: timeSlot,
        entry: text
    }
    var action = '';
    //check if data in local storage and return it if so
    let data = checkLocalStorage('save');
    //add new event to already stored data
    if (data != null) {
        //check if entry for timeslot exists
        let test = false;
        for (i = 1; i < data.length; i++) {
            let eventData = data[i];
            if (eventData.time == event.time) {
                //check if we are updating or saving
                action = eventData.entry == '' ? 'Saved event for ' : 'Updated event for ';
                eventData.entry = event.entry;
                test = true;
            }

        }
        //if not push new time slot data
        if (!test) {
            data.push(event);
            action = 'Saved event for ';
        }

    } else {
        //or just add new event
        data = [
            currentDate,
            event
        ]
        action = 'Saved event for ';
    }
    //save to local storage
    localStorage.setItem('calender', JSON.stringify(data));
    return action;

}
//function to check local storage data
function checkLocalStorage(type) {
    //check if calender data available for current day
    let data = JSON.parse(localStorage.getItem('calender'));
    //logic to populate from data
    if (type == "populate") {
        if (data != null) {
            //if not same day, remove key 
            if (data[0] != currentDate) {
                localStorage.removeItem('calender');
                return;
            }
            //if found, populate 
            populateFromLocalStorage(data);
            return;
        }
    }
    //logic to check if localStorage data avaialble
    if (type == "save") {
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
//function to populate text fields from storage
function populateFromLocalStorage(data) {
    for (i = 1; i < data.length; i++) {
        $('textarea[data-time=' + data[i].time + ']').val(data[i].entry);
    };

}
//Set header Current Day
currentDay.text(currentDate);
//Generate TimeBlocks
generateTimeBlocks();
//listen for request to save
timeBlockCont.on('click', function (e) {
    if (e.target.classList.contains('clickEvent')) {
        let timeSlot = e.target.dataset.time;
        let textArea = $('textarea[data-time=' + timeSlot + ']');
        let entry = textArea.val();
        let event = saveToCalender(timeSlot, entry);
        //check if clearing event entry
        if (entry == '') event = 'Cleared event for '
        //show feedback
        feedback.text(event + timeSlot);
        feedback.animate({
            height: '40px',
            duration: 500
        });
        setTimeout(function () {
            feedback.animate({
                height: '0',
                duration: 500
            })
        }, 1500);

    } else {
        return;
    }

})
