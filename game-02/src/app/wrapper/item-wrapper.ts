import { Item } from '../item';
import { ItemExtended } from '../class/item-extended';
import { AgedBrieFactory } from '../factory/aged-brie-factory';
import { BackstagePassFactory } from '../factory/backstage-pass-factory';
import { SulfurasFactory } from '../factory/sulfuras-factory';
import { ConjuredFactory } from '../factory/conjured-factory';
import { ItemFactory } from '../factory/item-factory';
import { ItemCategory } from '../item-category';
import { getCategory } from '../map-category-items';

export class ItemWrapper {
    static item: ItemExtended;
    static instance: ItemWrapper | null = null; 

    private constructor() {
    }

    static createItemWrapper(item: Item): ItemWrapper {
        let itemFactory: ItemFactory;
        const category = getCategory(item.name);

        switch (category) {
            case ItemCategory.AGED_BRIE:
                itemFactory = new AgedBrieFactory();
                break;
            case ItemCategory.BACKSTAGE_PASSES:
                itemFactory = new BackstagePassFactory();
                break;
            case ItemCategory.SULFURAS:
                itemFactory = new SulfurasFactory();
                break;
            case ItemCategory.CONJURED:
                itemFactory = new ConjuredFactory();
                break;
            default:
                itemFactory = new ItemFactory();
                break;
        }

        ItemWrapper.item = itemFactory.createItem(item.name, item.sellIn, item.quality);

        if (ItemWrapper.instance === null) {
            ItemWrapper.instance = new ItemWrapper();
        }

        return ItemWrapper.instance;
    }

    updateQuality() {
        ItemWrapper.item.updateQuality();
    }

    getItem() {
        return ItemWrapper.item;
    }
}