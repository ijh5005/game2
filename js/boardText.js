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
      soundEffects.play("got em/got em.m4a");
    } else if (type === "good") {
      text = boardText.getGoodText();
    } else if (type === "excellent") {
      text = boardText.getExcellentText();
    }
    task.addTextByQuerySelector(".interactiveText p", text);
    task.addClassByQuerySelector(".interactiveText p", "showText")
    setTimeout(() => {
      task.addTextByQuerySelector(".interactiveText p", "");
      task.removeClassByQuerySelector(".interactiveText p", "showText")
    }, 2000);
  }
}
