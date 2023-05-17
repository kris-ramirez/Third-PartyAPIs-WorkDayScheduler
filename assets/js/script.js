// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//save reference to important DOM elements
var timeDisplayEl = $('#currentDay');
var timeSaveBtnEl = $('.saveBtn');
var idsString = "#hour-9, #hour-10, #hour-11, #hour-12, #hour-13, #hour-14, #hour-15, #hour-16, #hour-17";
var idsArray = idsString.split(","); //Array of Ids
// TODO: Add code to display the current date in the header of the page.
$(function displaytime() {
    var date = dayjs().format('dddd, MMMM YYYY');
    timeDisplayEl.text(date);
});

// TODO: Add a listener for click events on the save button.
$(function () {
    function saveTimeblock() {
        //read user input 
        var timeBlock = $(this).siblings('.description').val();

        //get the ID of the time-block containing the button the was pushed
        var timeBlockId = $(this).parent().attr('id');
        //add to local storage
        localStorage.setItem(timeBlockId, timeBlock);
    }
    timeSaveBtnEl.on('click', saveTimeblock);

    //determine if time-block is in the past present or future 
    //get current time 
    var currentTime = dayjs(); //current time

    //loop over time-blocks
    $(".time-block").each(function () {
        var timeBlock = $(this);
        var timeBlockId = timeBlock.attr("id");
        var blockTime = getTimeFromBlock(timeBlockId);

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

// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?



