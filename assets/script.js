$(function () {
  let today = dayjs();
  let currentTime = dayjs().$H;
  $("#currentDay").text(today.format("dddd MMM D, YYYY"));
  let timeBlock = $(".time-block");

  //   set colors of timeblocks
  const setColorBlocks = () => {
    for (let i = 0; i < timeBlock.length; i++) {
      if (timeBlock[i].dataset.id < currentTime) {
        console.log(timeBlock[i].dataset.id);
        timeBlock[i].classList.remove("future");
        timeBlock[i].classList.remove("present");
        timeBlock[i].classList.add("past");
      }
      if (timeBlock[i].dataset.id == currentTime) {
        timeBlock[i].classList.remove("future");
        timeBlock[i].classList.remove("past");
        timeBlock[i].classList.add("present");
      }
    }
  };
  // run color timeblocks
  setColorBlocks();
});
