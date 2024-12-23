import { expect } from 'chai';
import { GildedRose } from '../app/gilded-rose';
import { Item } from '../app/item';

// FILE: game-02/app/gilded-rose.test.ts


describe('GildedRose', function() {
    it('should decrease quality and sellIn for regular items', function() {
        const items = [new Item('Elixir of the Mongoose', 5, 7)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(6);
    });

    it('should not change quality or sellIn for Sulfuras', function() {
        const items = [new Item('Sulfuras, Hand of Ragnaros', 0, 80)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(80);
    });

    it('should be always quality 80 for Sulfuras items', function() {
        const items = [new Item('Sulfuras, Hand of Ragnaros', 0, 0)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(80);
    });

    it('should increase quality for Aged Brie', function() {
        const items = [new Item('Aged Brie', 2, 0)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(1);
    });

    it('should increase quality for Backstage passes', function() {
        const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(14);
        expect(items[0].quality).to.equal(21);
    });

    it('should increase quality by 2 when there are 10 days or less for Backstage passes', function() {
        const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(22);
    });

    it('should increase quality by 3 when there are 5 days or less for Backstage passes', function() {
        const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(23);
    });

    it('should drop quality to 0 after the concert for Backstage passes', function() {
        const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });

    it('should decrease quality twice as fast for expired items', function() {
        const items = [new Item('Elixir of the Mongoose', 0, 7)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(5);
    });

    it('should not decrease quality below 0', function() {
        const items = [new Item('Elixir of the Mongoose', 5, 0)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(0);
    });

    it('should not increase quality above 50', function() {
        const items = [new Item('Aged Brie', 2, 50)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(50);
    });

    it('should decrease quality twice as fast for Conjured items', function() {
        const items = [new Item('Conjured Mana Cake', 3, 6)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(2);
        expect(items[0].quality).to.equal(4);
    });

    it('should decrease quality twice as fast for Conjured items even if they are expired', function() {
        const items = [new Item('Conjured Mana Cake', 0, 6)];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(2);
    });

    it('should handle all items according to their categories', function() {
        const items = [
            new Item('Sulfuras, Hand of Ragnaros', 0, 80),
            new Item('Sulfuras, other legenday', 0, 70),
            new Item('Aged Brie', 2, 0),
            new Item('Aged Brie II', 2, 0),
            new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
            new Item('Backstaged other pass', 15, 20),
            new Item('Elixir of the Mongoose', 5, 7),
            new Item('Conjured Mana Cake', 3, 6)
        ];
        const gildedRose = new GildedRose(items);
        GildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(80);

        expect(items[1].sellIn).to.equal(0);
        expect(items[1].quality).to.equal(80);

        expect(items[2].sellIn).to.equal(1);
        expect(items[2].quality).to.equal(1);

        expect(items[3].sellIn).to.equal(1);
        expect(items[3].quality).to.equal(1);

        expect(items[4].sellIn).to.equal(14);
        expect(items[4].quality).to.equal(21);

        expect(items[5].sellIn).to.equal(14);
        expect(items[5].quality).to.equal(21);

        expect(items[6].sellIn).to.equal(4);
        expect(items[6].quality).to.equal(6);

        expect(items[7].sellIn).to.equal(2);
        expect(items[7].quality).to.equal(4);
    });
});