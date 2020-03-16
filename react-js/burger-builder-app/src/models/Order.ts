import { OrderableIngredients } from './Burger';

export type OrderingData = {
    id?: string;
    ingredients: OrderableIngredients;
    price: number;
    orderData: any
}

export type ContactInputElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement