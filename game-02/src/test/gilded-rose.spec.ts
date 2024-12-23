import { expect } from 'chai';
import { GildedRose } from '../app/gilded-rose';
import { Item } from '../app/item';

// FILE: game-02/app/gilded-rose.test.ts


describe('GildedRose', function() {
    it('should decrease quality and sellIn for regular items', function() {
        //const items = [new Item('Elixir of the Mongoose', 5, 7)];
        const gildedRose = new GildedRose();
        gildedRose.addItem('Elixir of the Mongoose', 5, 7);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(4);
        expect(gildedRose.items[0].quality).to.equal(6);
    });

    it('should not change quality or sellIn for Sulfuras', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Sulfuras, Hand of Ragnaros', 0, 80);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(0);
        expect(gildedRose.items[0].quality).to.equal(80);
    });

    it('should be always quality 80 for Sulfuras items', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Sulfuras, Hand of Ragnaros', 0, 0);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(0);
        expect(gildedRose.items[0].quality).to.equal(80);
    });

    it('should increase quality for Aged Brie', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Aged Brie', 2, 0);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(1);
        expect(gildedRose.items[0].quality).to.equal(1);
    });

    it('should increase quality for Backstage passes', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Backstage passes to a TAFKAL80ETC concert', 15, 20);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(14);
        expect(gildedRose.items[0].quality).to.equal(21);
    });

    it('should increase quality by 2 when there are 10 days or less for Backstage passes', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Backstage passes to a TAFKAL80ETC concert', 10, 20);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(9);
        expect(gildedRose.items[0].quality).to.equal(22);
    });

    it('should increase quality by 3 when there are 5 days or less for Backstage passes', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Backstage passes to a TAFKAL80ETC concert', 5, 20);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(4);
        expect(gildedRose.items[0].quality).to.equal(23);
    });

    it('should drop quality to 0 after the concert for Backstage passes', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Backstage passes to a TAFKAL80ETC concert', 0, 20);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(-1);
        expect(gildedRose.items[0].quality).to.equal(0);
    });

    it('should decrease quality twice as fast for expired items', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Elixir of the Mongoose', 0, 7);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(-1);
        expect(gildedRose.items[0].quality).to.equal(5);
    });

    it('should not decrease quality below 0', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Elixir of the Mongoose', 5, 0);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(4);
        expect(gildedRose.items[0].quality).to.equal(0);
    });

    it('should not increase quality above 50', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Aged Brie', 2, 50);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(1);
        expect(gildedRose.items[0].quality).to.equal(50);
    });

    it('should decrease quality twice as fast for Conjured items', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Conjured Mana Cake', 3, 6);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(2);
        expect(gildedRose.items[0].quality).to.equal(4);
    });

    it('should decrease quality twice as fast for Conjured items even if they are expired', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Conjured Mana Cake', 0, 6);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).to.equal(-1);
        expect(gildedRose.items[0].quality).to.equal(2);
    });

    it('should handle all items according to their categories', function() {
        const gildedRose = new GildedRose();
        gildedRose.addItem('Sulfuras, Hand of Ragnaros', 0, 80);
        gildedRose.addItem('Sulfuras, other legenday', 0, 70);
        gildedRose.addItem('Aged Brie', 2, 0);
        gildedRose.addItem('Aged Brie II', 2, 0);
        gildedRose.addItem('Backstage passes to a TAFKAL80ETC concert', 15, 20);
        gildedRose.addItem('Backstaged other pass', 15, 20);
        gildedRose.addItem('Elixir of the Mongoose', 5, 7);
        gildedRose.addItem('Conjured Mana Cake', 3, 6);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].sellIn).to.equal(0);
        expect(gildedRose.items[0].quality).to.equal(80);
        expect(gildedRose.items[1].sellIn).to.equal(0);
        expect(gildedRose.items[1].quality).to.equal(80);
        expect(gildedRose.items[2].sellIn).to.equal(1);
        expect(gildedRose.items[2].quality).to.equal(1);
        expect(gildedRose.items[3].sellIn).to.equal(1);
        expect(gildedRose.items[3].quality).to.equal(1);
        expect(gildedRose.items[4].sellIn).to.equal(14);
        expect(gildedRose.items[4].quality).to.equal(21);
        expect(gildedRose.items[5].sellIn).to.equal(14);
        expect(gildedRose.items[5].quality).to.equal(21);
        expect(gildedRose.items[6].sellIn).to.equal(4);
        expect(gildedRose.items[6].quality).to.equal(6);
        expect(gildedRose.items[7].sellIn).to.equal(2);
        expect(gildedRose.items[7].quality).to.equal(4);
    });
});