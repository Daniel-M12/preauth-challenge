import { ItemExtended } from './item-extended';

export class Sulfuras extends ItemExtended {
    constructor(name: string, sellIn: number, quality: number) {
        super(name, 0, 80);
    }

    updateQuality() {
        return;
    }
}