const animations = {
  explosionImages: ["1_1.png", "1_2.png", "1_3.png", "1_4.png", "1_5.png", "1_6.png", "1_7.png", "1_8.png", "1_9.png"],
  explosionImages2: ["2_1.png", "2_2.png", "2_3.png", "2_4.png", "2_5.png", "2_6.png", "2_7.png", "2_8.png", "2_9.png"],
  animate: (imgfolder, imageArray, limit, box) => {
    let counter = 0;
    const length = animations[imageArray].length;
    const displayImage = (img) => {
      const image = img ? `url("img/${imgfolder}/${img}")` : ""; 
      $(`.${box}Explosion`).css("backgroundImage", image)
    }
    const animating = setInterval(() => {
      if (counter === limit) {
        displayImage(false);
        clearInterval(animating);
        counter = 0;
      } else {
        displayImage(animations[imageArray][counter]);
        counter++;
      }
    }, 80);
  }
}