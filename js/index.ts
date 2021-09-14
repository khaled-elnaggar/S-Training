interface ILevel {
  incLevel(): void;
  getCurrLevel(): number;
  decRandomCount(): void;
  getImageCount(): number;
  getRandomCount(): number;
  getImageSize(): number;
  getEmoji(): string;
  resetLevel(): void;
}

class EasyLevel implements ILevel {
  private EMOJIS: string[] = ["😇", "🙃", "🤪", "😂", "😜", "🥺"];
  private currLevel: number = 1;
  private randomCount: number = 1;

  public incLevel(): void {
    this.currLevel++;
    this.randomCount = this.currLevel;
  }

  public getCurrLevel(): number { return this.currLevel };
  public decRandomCount(): void { this.randomCount-- };
  public getImageCount(): number { return this.currLevel * 8 };
  public getRandomCount(): number { return this.randomCount };
  public getImageSize(): number { return Math.max(50, 100 - (10 * this.currLevel)) };
  public getEmoji(): string { return (this.currLevel < 4) ? this.EMOJIS[this.currLevel - 1] : this.EMOJIS[Math.round(this.EMOJIS.length * Math.random())] };
  public resetLevel(): void { this.currLevel = 1 };
}

//===========================================================================================================================

interface IScoreSystem {
  getScore(): number;
  incScore(): void;
  decScore(): void;
  resetScore(): void;
}

class TenFiveScore implements IScoreSystem {
  private score: number = 0;
  getScore() { return this.score };
  incScore() { this.score += 10 }; // Decrease the amount of random images from level inside image factory LEVEL.decRandomCount()
  decScore() { this.score -= 5 };
  resetScore() { this.score = 0 };
}

//===========================================================================================================================
interface GameView {
  updateGame(): void;
}


class HTMLView implements GameView {
  private level: ILevel;
  private score: IScoreSystem;

  private LEFT_CARD = <HTMLElement>document.getElementById('left-card');
  private RIGHT_CARD = <HTMLElement>document.getElementById('right-card');
  private SCORE_SPAN = <HTMLElement>document.getElementById('score-span');
  private LEVEL_SPAN = <HTMLElement>document.getElementById('level-span');
  private IMAGES_LEFT_SPAN = <HTMLElement>document.getElementById('mismatched-span');

  constructor(level: ILevel, score: IScoreSystem) {
    this.level = level;
    this.score = score;
  }

  updateGame(): void {
    this.SCORE_SPAN.innerHTML = String(this.score.getScore());
    this.IMAGES_LEFT_SPAN.innerHTML = String(this.level.getRandomCount());
    this.LEVEL_SPAN.innerHTML = String(this.level.getCurrLevel());
    if (this.level.getRandomCount() == 0) {
      this.goToNextLevet();
    }
  }

  goToNextLevet(): void {
    this.LEFT_CARD.replaceChildren();
    this.RIGHT_CARD.replaceChildren();
    this.level.incLevel();
    this.updateGame()
  }
}

//===========================================================================================================================

class ImageFactory {

  private LEFT_CARD = document.getElementById('left-card');
  private RIGHT_CARD = document.getElementById('right-card');
  private level: ILevel;
  private score: IScoreSystem;
  private view: GameView;

  constructor(level: ILevel, score: IScoreSystem, view: GameView) {
    this.level = level;
    this.score = score;
    this.view = view;
  }


  private genAnImage(): Node {
    const offset: number = this.level.getImageSize() / 5;

    const left: string = Math.random() * (100 - offset) + "%";
    const top: string = Math.random() * (100 - offset) + "%";

    const image: HTMLElement = document.createElement('span');
    image.style.left = left;
    image.style.top = top;
    image.style.fontSize = this.level.getImageSize() + "px";
    image.style.position = "absolute";
    image.style.cursor = "crosshair"
    image.innerHTML = this.level.getEmoji();
    return image;
  }

  genLeftAndRight(): void {
    const imageLeft = <HTMLElement>this.genAnImage();
    imageLeft.addEventListener('click', () => {
      this.score.decScore();
      this.view.updateGame();
    }
    );

    this.LEFT_CARD.appendChild(imageLeft);
    let imageRight = <HTMLElement>imageLeft.cloneNode();
    imageRight.innerHTML = imageLeft.innerHTML;
    imageRight.addEventListener('click', () => {
      this.score.decScore();
      this.view.updateGame();
      if (this.level.getRandomCount() == 0) {
        this.genAllImages();
      }
    }
    );
    this.RIGHT_CARD.appendChild(imageRight);
  }

  genRandomLeft(): void {
    const randomImage = this.genAnImage();
    randomImage.addEventListener('click', (e) => {
      this.score.incScore();
      this.LEFT_CARD.removeChild(<HTMLElement>e.target);
      this.view.updateGame();
    });
    this.LEFT_CARD.appendChild(randomImage);
  }

  genAllImages(): void {
    for (var i = 0; i < this.level.getImageCount(); i++) {
      this.genLeftAndRight()
    }

    for (var i = 0; i < this.level.getRandomCount(); i++) {
      this.genRandomLeft();
    }
  }
}



