export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    static items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        GildedRose.items = items;
    }

    static updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name == 'Sulfuras, Hand of Ragnaros') {
                continue;
            }
            
            this.items[i].sellIn = this.items[i].sellIn - 1;

            if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert'){
                if (this.items[i].sellIn < 0){
                    this.items[i].quality = this.items[i].quality - this.items[i].quality;
                    continue;
                }

                this.increaseQualityForItem(i);
                
                if (this.items[i].sellIn < 11) {
                    this.increaseQualityForItem(i);
                }
                if (this.items[i].sellIn < 6) {
                    this.increaseQualityForItem(i);
                }
                continue;
            }

            if (this.items[i].name == 'Aged Brie') {
                this.increaseQualityForItem(i);
                continue;
            }

            
            if (this.items[i].quality > 0) {
                this.items[i].quality = this.items[i].quality - 1
            }
            
            if (this.items[i].sellIn < 0) {
                if (this.items[i].quality > 0) {
                    this.items[i].quality = this.items[i].quality - 1
                }
            }
        }

        return this.items;
    }

    private static increaseQualityForItem(itemNumber: number) {
        if (this.items[itemNumber].quality < 50) {
            this.items[itemNumber].quality = this.items[itemNumber].quality + 1
        }
    }
}
