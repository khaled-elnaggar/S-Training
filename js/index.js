const LEFT_CARD = document.getElementById('left-card');
const RIGHT_CARD = document.getElementById('right-card');
const EMOJIS = ["😇", "🙃", "🤪", "😂", "😜", "🥺"]

const LEVEL = {
  _currLevel: 1,
  incLevel: () => this._currLevel++,
  getImageCount() { return this._currLevel * 8 },
  getRandomCount() { return 1 },
  getImageSize() { return Math.max(40, 100 - (10 * this._currLevel)) },
  getEmoji() { return (this._currLevel < 5) ? EMOJIS[this._currLevel - 1] : EMOJIS[parseInt(EMOJIS.length * Math.random())] },
  resetLevel() { this._currLevel = 1 }
}

const SCORE = {
  _score: 0,
  getScore() { return this._score },
  incScore() { this._score += 10 },
  decScore() { this._score -= 5 },
  resetScore() { this._score = 0 }
}

const imagesFactory = {
  _genAnImage() {
    const offset = LEVEL.getImageSize() / 5;

    const left = Math.random() * (100 - offset) + "%";
    const top = Math.random() * (100 - offset) + "%";

    const image = document.createElement('span');
    image.style.left = left;
    image.style.top = top;
    image.style.fontSize = LEVEL.getImageSize() + "px";
    image.style.position = "absolute";
    image.style.cursor = "crosshair"
    image.innerHTML = LEVEL.getEmoji();
    return image;
  },

  genLeftAndRight() {
    const imageLeft = this._genAnImage();
    imageLeft.addEventListener('click', () => { SCORE.decScore() });
    LEFT_CARD.appendChild(imageLeft);
    let imageRight = imageLeft.cloneNode();
    imageRight.innerHTML = imageLeft.innerHTML;
    imageRight.addEventListener('click', () => { SCORE.decScore() });
    RIGHT_CARD.appendChild(imageRight);
  },

  genRandomLeft() {
    const randomImage = this._genAnImage();
    randomImage.addEventListener('click', (e) => { SCORE.incScore(); LEFT_CARD.removeChild(e.target) });
    LEFT_CARD.appendChild(randomImage);
  }
}



for (var i = 0; i < LEVEL.getImageCount(); i++) {
  imagesFactory.genLeftAndRight()
}

for (var i = 0; i < LEVEL.getRandomCount(); i++) {
  imagesFactory.genRandomLeft();
}
