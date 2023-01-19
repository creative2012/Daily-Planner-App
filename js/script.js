const currentDay = $('#currentDay');
currentDay.text(moment().format('dddd, Do YYYY'));
const timeBlockCont = $('.SchedContainer');

function getCurrentHour(func, i) {

    if(func == 'class'){
        let current = moment().hours();
        let className = 'event-area';

        if (i < current) {
            className += ' past';
        } else if( i == current){
            className += ' present';
        } else {
            className += ' future';
        }

        return className;
    }
    if (func == 'prefix'){
        let hourText = 'AM';
        if (i > 11 && i != 24){
            hourText = 'PM';
        } 
        return hourText;
    }


}


function generateTimeBlocks() {

    var time = 1;

    for (var i = 1; i < 25; i++) {

        let timeBlock = $('<div>');
        let hour = $('<div>');
        let textArea = $('<textarea>');
        let saveBtn = $('<div>');
        let icon = $('<i>');

        timeBlock.addClass('timeBlock');
        hour.addClass('hour');

        textArea.addClass(getCurrentHour('class', i));

        saveBtn.addClass('saveBtn');
        icon.addClass('fa fa-cloud-upload-alt');
    
        hour.text(time + getCurrentHour('prefix', i))
        saveBtn.append(icon);
        timeBlock.append(hour).append(textArea).append(saveBtn);
        timeBlockCont.append(timeBlock);

        time < 12 ? time++ : time = 1;
    }

}
generateTimeBlocks()