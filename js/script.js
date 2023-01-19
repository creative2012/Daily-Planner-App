const currentDay = $('#currentDay');
const timeBlockCont = $('.SchedContainer');

//function to check which class and time prefix to add
function getCurrentHour(func, i) {

    //check class for text input area
    if (func == 'class') {
        let current = moment().hours();
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
    //check prefix for am/pm
    if (func == 'prefix') {
        let hourText = 'AM';
        if (i > 11 && i != 24) {
            hourText = 'PM';
        }
        return hourText;
    }

}
//Function to generate time blocks
function generateTimeBlocks() {

    let time = 12;

    for (var i = 0; i < 24; i++) {

        //create the Elements
        let timeBlock = $('<div>');
        let hour = $('<div>');
        let textArea = $('<textarea>');
        let saveBtn = $('<div>');
        let icon = $('<i>');
        //Add classes
        timeBlock.addClass('timeBlock');
        hour.addClass('hour');
        textArea.addClass(getCurrentHour('class', i));
        saveBtn.addClass('saveBtn');
        icon.addClass('fa fa-cloud-upload-alt');
        //append to page
        hour.text(time + getCurrentHour('prefix', i))
        saveBtn.append(icon);
        timeBlock.append(hour).append(textArea).append(saveBtn);
        timeBlockCont.append(timeBlock);
        
        time < 12 ? time++ : time = 1;
    }

}
//Set header Current Day
currentDay.text(moment().format('dddd, Do YYYY'));
//Generate TimeBlocks
generateTimeBlocks();