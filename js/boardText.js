const boardText = {
  text: {
    // bad: ["Oh Nah", "You drawlin", "Haah... got em", "You tripin", "Bruh"],
    bad: ["Haah... got em"],
    // good: ["I see u", "Lets get it", "Chill", "Iiight"],
    good: ["I see u"],
    // excellent: ["Okurrrr", "Yarrrrpp", "Aaaaaa", "You hyyyype"]
    excellent: ["Ooo Yes"]
  },
  getBadText: () => {
    return gametask.getRandomIndexInArray(boardText.text.bad);
  },
  getGoodText: () => {
    return gametask.getRandomIndexInArray(boardText.text.good);
  },
  getExcellentText: () => {
    return gametask.getRandomIndexInArray(boardText.text.excellent);
  },
  showText: (type) => {
    let text;
    if(type === "bad"){
      if(textType === "bad") return null;
      text = boardText.getBadText();
      soundEffects.play("got em/got em.m4a");
    } else if (type === "good") {
      if(textType === "good") return null;
      text = boardText.getGoodText();
      soundEffects.play("jasmin/i see u.m4a");
    } else if (type === "excellent") {
      if(textType === "excellent") return null;
      text = boardText.getExcellentText();
      soundEffects.play("jasmin/yes.m4a");
    }
    textType = type;
    boardText.showOnBoard(text, 2000);
  },
  showOnBoard: (text, adjustTimeout) => {
    gametask.addTextByQuerySelector(".interactiveText p", text);
    gametask.addClassByQuerySelector(".interactiveText p", "showText")
    setTimeout(() => {
      gametask.addTextByQuerySelector(".interactiveText p", "");
      gametask.removeClassByQuerySelector(".interactiveText p", "showText")
    }, adjustTimeout || 2000);
  }
}

module.exports = boardText;
