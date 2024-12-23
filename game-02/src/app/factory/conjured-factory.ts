import { Conjured } from "../class/conjured";
import { ItemExtended } from "../class/item-extended";
import { ItemFactory } from "./item-factory";

export class ConjuredFactory extends ItemFactory {
    createItem(name: string, sellIn: number, quality: number): ItemExtended {
        return new Conjured(name, sellIn, quality);
    }
}