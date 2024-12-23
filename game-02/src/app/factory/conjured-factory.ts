import { Conjured } from "../class/conjured";
import { Item } from "../item";
import { ItemFactory } from "./item-factory";

export class ConjuredFactory extends ItemFactory {
    createItem(name: string, sellIn: number, quality: number): Item {
        return new Conjured(name, sellIn, quality);
    }
}