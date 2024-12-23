import { Item } from "../item";

export class ItemFactory {
    createItem(name: string, sellIn: number, quality: number): Item{
        return new Item(name, sellIn, quality);
    }
}