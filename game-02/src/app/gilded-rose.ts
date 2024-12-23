import { Item } from './item';
import { ItemWrapper } from './wrapper/item-wrapper';

export class GildedRose {
    items: Array<Item>;

    constructor(items: Item[]) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const itemWrapper = ItemWrapper.createItemWrapper(this.items[i]); 
            itemWrapper.updateQuality();
            
            const updatedItem = itemWrapper.getItem();
            this.items[i] = updatedItem;
        }

        return this.items;
    }

}
