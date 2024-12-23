import { AgedBrie } from "../class/aged-brie";
import { Item } from "../item";
import { ItemFactory } from "./item-factory";

export class AgedBrieFactory extends ItemFactory {
    createItem(name: string, sellIn: number, quality: number): Item {
        return new AgedBrie(name, sellIn, quality);
    }
}