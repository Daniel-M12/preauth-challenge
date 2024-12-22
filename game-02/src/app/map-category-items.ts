import mapCategoryItems from './items-inventory.json';

export function getCategory(itemName: string): string {
    return mapCategoryItems[itemName] || 'Normal';
}