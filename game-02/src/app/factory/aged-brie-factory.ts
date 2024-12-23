import { AgedBrie } from "../class/aged-brie";
import { ItemExtended } from "../class/item-extended";
import { ItemFactory } from "./item-factory";

export class AgedBrieFactory extends ItemFactory {
    createItem(name: string, sellIn: number, quality: number): ItemExtended {
        return new AgedBrie(name, sellIn, quality);
    }
}