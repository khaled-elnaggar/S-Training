const LEFT_CARD = document.getElementById('left-card');
const RIGHT_CARD = document.getElementById('right-card');
const EMOJIS = ["😂", "🙃", "😇", "🤪", "😜", "🥺"]

const LEVEL = {
  _currLevel: 3,
  incLevel: () => this._currLevel++,
  getImageCount() { return this._currLevel * 6 },
  getRandomCount() { return 1 },
  getImageSize() { return 100 - (10 * this._currLevel) }
}


const imagesFactory = {
  getAnImage(emoji) {

    const left = Math.random() * (100 - LEVEL.getImageSize() / 5) + "%";
    const top = Math.random() * (100 - LEVEL.getImageSize() / 5) + "%";

    const image = document.createElement('span');
    image.style.left = left;
    image.style.top = top;
    image.style.fontSize = LEVEL.getImageSize() + "px";
    image.style.position = "absolute";
    image.innerHTML = emoji;
    return image;
  },

  genLeftAndRight() {
    const imageLeft = this.getAnImage(EMOJIS[parseInt(EMOJIS.length * Math.random())]);

    LEFT_CARD.appendChild(imageLeft);
    let imageRight = imageLeft.cloneNode();
    imageRight.innerHTML = imageLeft.innerHTML;
    RIGHT_CARD.appendChild(imageRight);
  }
}



for (var i = 0; i < LEVEL.getImageCount(); i++) {
  imagesFactory.genLeftAndRight()
}
