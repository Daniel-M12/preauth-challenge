import { ItemExtended } from "../class/item-extended";
import { Item } from "../item";

export class ItemFactory {
    createItem(name: string, sellIn: number, quality: number): ItemExtended {
        return new ItemExtended(name, sellIn, quality);
    }
}