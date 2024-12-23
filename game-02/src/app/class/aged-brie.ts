import { ItemExtended } from "./item-extended";

export class AgedBrie extends ItemExtended {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }
  
  updateQuality() {
    this.sellIn -= 1;
    if (this.quality < 50) {
      this.quality += 1;
    }
  }
}