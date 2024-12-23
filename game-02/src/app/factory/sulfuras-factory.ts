import { Sulfuras } from "../class/sulfuras";
import { ItemFactory } from "./item-factory";

export class SulfurasFactory extends ItemFactory {
  createItem(name: string, sellIn: number, quality: number) {
    return new Sulfuras(name, sellIn, quality);
  }
}