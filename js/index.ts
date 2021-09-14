interface Level {
  incLevel(): void;
  decRandomCount(): void;
  getImageCount(): number;
  getRandomCount(): number;
  getImageSize(): number;
  getEmoji(): string;
  resetLevel(): void;
}

class EasyLevel implements Level {
  private EMOJIS: string[] = ["😇", "🙃", "🤪", "😂", "😜", "🥺"];
  private currLevel: number = 1;
  private randomCount: number = 1;

  public incLevel(): void {
    this.currLevel++;
    this.randomCount = this.currLevel;
  }

  public decRandomCount(): void { this.randomCount-- };
  public getImageCount(): number { return this.currLevel * 8 };
  public getRandomCount(): number { return this.randomCount };
  public getImageSize(): number { return Math.max(50, 100 - (10 * this.currLevel)) };
  public getEmoji(): string { return (this.currLevel < 4) ? this.EMOJIS[this.currLevel - 1] : this.EMOJIS[Math.round(this.EMOJIS.length * Math.random())] };
  public resetLevel(): void { this.currLevel = 1 };
}

