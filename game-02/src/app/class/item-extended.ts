import { Item } from "../item";

export class ItemExtended extends Item {
    constructor(name: string, sellIn: number, quality: number) {
        super(name, sellIn, quality);
    }
    updateQuality(): void {
        this.sellIn = this.sellIn - 1;
        if (this.sellIn <= 0) {
            this.quality = this.quality - 2;
        } else {
            this.quality = this.quality - 1;
        }
        if (this.quality < 0) {
            this.quality = 0;
        }
    }
}