import { Item } from "../item";

export class Conjured extends Item {
    constructor(name: string, sellIn: number, quality: number) {
        super(name, sellIn, quality);
      }
    
    updateQuality() {
        this.sellIn -= 1;
        if (this.quality > 0) {
            this.quality -= 2;
        }
        if (this.sellIn <= 0 && this.quality > 0) {
            this.quality -= 2;
        }
    }
}