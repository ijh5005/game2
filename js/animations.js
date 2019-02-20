const animations = {
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
