import { getCategory } from './map-category-items';
import { ItemCategory } from './item-category';
import { ItemFactory } from './factory/item-factory';
import { SulfurasFactory } from './factory/sulfuras-factory';
import { AgedBrieFactory } from './factory/aged-brie-factory';
import { BackstagePassFactory } from './factory/backstage-pass-factory';
import { ConjuredFactory } from './factory/conjured-factory';
import { Item } from './item';

export class GildedRose {
    items: Array<Item>;

    constructor() {
        this.items = [];
    }

    addItem(name: string, sellIn: number, quality: number) {
        const category = getCategory(name);
        let item: Item;
        let itemFactory: ItemFactory;

        switch (category) {
            case ItemCategory.SULFURAS:
                itemFactory = new SulfurasFactory();
                break;
            case ItemCategory.AGED_BRIE:
                itemFactory = new AgedBrieFactory();

                break;
            case ItemCategory.BACKSTAGE_PASSES:
                itemFactory = new BackstagePassFactory();
                break;
            case ItemCategory.CONJURED:
                itemFactory = new ConjuredFactory();
                break;
            default:
                itemFactory = new ItemFactory();
                break;
        }

        item = itemFactory.createItem(name, sellIn, quality);

        this.items.push(item);
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const category = getCategory(this.items[i].name);

            if (category == ItemCategory.SULFURAS){
                this.items[i].quality = 80; //This quality set protection could be done in the Item constructor, if Mr. Goglin allows it.
                continue;
            }
            
            this.items[i].sellIn = this.items[i].sellIn - 1; //All items gets older by one day

            if (category == ItemCategory.BACKSTAGE_PASSES){
                if (this.items[i].sellIn < 0){
                    this.dropQualityToZero(i);
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

            if (category == ItemCategory.AGED_BRIE){
                this.increaseQualityForItem(i);
                continue;
            }

            this.decreaseQualityForItem(i);
            
            if (this.items[i].sellIn < 0) {
                this.decreaseQualityForItem(i);
            }
        }

        return this.items;
    }

    private increaseQualityForItem(itemNumber: number) {
        if (this.items[itemNumber].quality < 50) {
            this.items[itemNumber].quality = this.items[itemNumber].quality + 1
        }
    }

    private decreaseQualityForItem(itemNumber: number) {
        if (this.items[itemNumber].quality > 0) {
            const multiplier = (getCategory(this.items[itemNumber].name) == ItemCategory.CONJURED)? 2 : 1;
            this.items[itemNumber].quality = this.items[itemNumber].quality - (1 * multiplier);
        }
    }

    private dropQualityToZero(itemNumber: number) {
        this.items[itemNumber].quality = 0;
    }
}
