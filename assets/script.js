$(function () {
  let today = dayjs();
  let currentTime = dayjs().$H;
  let timeBlock = $(".time-block");
  let storeItemsArr = JSON.parse(localStorage.getItem("storeData")) || [];

  //show current date in header
  $("#currentDay").text(today.format("dddd MMM D, YYYY"));

  //   set colors of timeblocks
  const setColorBlocks = () => {
    for (let i = 0; i < timeBlock.length; i++) {
      if (timeBlock[i].dataset.id < currentTime) {
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

  //   get text and timestamp on save button
  const saveBlock = $(".saveBtn").click(function (e) {
    e.preventDefault();
    let blockText = $(this).siblings("textarea").val();
    let timeStamp = $(this).parent("section")[0].dataset.id;
    if (!blockText) {
      return;
    } else {
      let obj = { text: blockText, time: timeStamp };
      storeItemsArr.push(obj);
      localStorage.setItem("storeData", JSON.stringify(storeItemsArr));
      $("#verify-save").text(`Event saved: ${$(this).siblings("div").text()}`);
    }
  });
  //   set text and timestamps in timeblocks
  const setItemBlocks = () => {
    for (let i = 0; i < storeItemsArr.length; i++) {
      const item = storeItemsArr[i];
      const time = item.time;
      const text = item.text;
      // Set the value of corresponding textarea using data-id attribute
      $(`section[data-id="${time}"] textarea`).val(text);
    }
  };
  //   set the item blocks to view events saved
  setItemBlocks();

  // clear button
  $("#clear-btn").on("click", () => {
    localStorage.clear();
    $("section,textarea").val("");
    storeItemsArr = [];
    $("#verify-save").text("");
  });
});
