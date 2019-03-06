const boardText = {
  text: {
    bad: ["Oh Nah", "You drawlin", "Haah... got em", "You tripin"],
    good: ["I see u", "Lets get it", "Chill", "Iiight"],
    excellent: ["Okurrrr", "Yarrrrpp", "Aaaaaa", "You hyyyype"]
  },
  getBadText: () => {
    return task.getRandomIndexInArray(boardText.text.bad);
  },
  getGoodText: () => {
    return task.getRandomIndexInArray(boardText.text.good);
  },
  getExcellentText: () => {
    return task.getRandomIndexInArray(boardText.text.excellent);
  },
  showText: (type) => {
    let text;
    if(type === "bad"){
      text = boardText.getBadText();
    } else if (type === "good") {
      text = boardText.getGoodText();
    } else if (type === "excellent") {
      text = boardText.getExcellentText();
    }
    $(".interactiveText p").text(text).addClass("showText");
    setTimeout(() => {
      $(".interactiveText p").text("").removeClass("showText");
    }, 2000);
  }
}
