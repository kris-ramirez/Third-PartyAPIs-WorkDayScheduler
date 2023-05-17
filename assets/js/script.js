//save reference to important DOM elements
var timeDisplayEl = $('#currentDay');
var timeSaveBtnEl = $('.saveBtn');
var idsString = "#hour-9, #hour-10, #hour-11, #hour-12, #hour-13, #hour-14, #hour-15, #hour-16, #hour-17";
//Array of Ids
var idsArray = idsString.split(",");

// Code to display the current date in the header of the page.
$(function displaytime() {
    var date = dayjs().format('dddd, MMMM YYYY');
    timeDisplayEl.text(date);
});

$(function () {

    function saveTimeblock() {
        //read user input 
        var timeBlock = $(this).siblings('.description').val();
        //get the ID of the time-block containing the button the was pushed
        var timeBlockId = $(this).parent().attr('id');
        //add to local storage
        localStorage.setItem(timeBlockId, timeBlock);
    }
    //listener for click events on the save button.
    timeSaveBtnEl.on('click', saveTimeblock);

    //get current time 
    var currentTime = dayjs();

    //loop over time-blocks
    $(".time-block").each(function () {
        var timeBlock = $(this);
        var timeBlockId = timeBlock.attr("id");
        var blockTime = getTimeFromBlock(timeBlockId);

        //Code to get any user input that was saved in localStorage and set
        // the values of the corresponding textarea elements. 
        var newBlock = localStorage.getItem(timeBlockId);
        var textarea = $(this).children('.description');
        textarea.val(newBlock);

        //compare time-block time with actual time
        if (blockTime.isBefore(currentTime, "hour")) {
            timeBlock.removeClass("present");
            timeBlock.removeClass("future");
            timeBlock.addClass("past");
        } else if (blockTime.isAfter(currentTime, "hour")) {
            timeBlock.removeClass("past");
            timeBlock.removeClass("present");
            timeBlock.addClass("future");
        } else {
            timeBlock.removeClass("past");
            timeBlock.removeClass("future");
            timeBlock.addClass("present");
        }
    });

    function getTimeFromBlock(blockId) {
        var hour = parseInt(blockId.split("-")[1]);
        return dayjs().hour(hour).startOf("hour");
    }
});





