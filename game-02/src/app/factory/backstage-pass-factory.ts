import { BackstagePass } from "../class/backstage-pass";
import { Item } from "../item";
import { ItemFactory } from "./item-factory";

export class BackstagePassFactory extends ItemFactory {
    createItem(name: string, sellIn: number, quality: number): Item {
        return new BackstagePass(name, sellIn, quality);
    }
}