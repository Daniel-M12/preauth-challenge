import { BackstagePass } from "../class/backstage-pass";
import { ItemExtended } from "../class/item-extended";
import { ItemFactory } from "./item-factory";

export class BackstagePassFactory extends ItemFactory {
    createItem(name: string, sellIn: number, quality: number): ItemExtended {
        return new BackstagePass(name, sellIn, quality);
    }
}