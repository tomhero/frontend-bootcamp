import { OrderableIngredients } from './Burger';

export type OrderingData = {
    id?: string;
    ingredients: OrderableIngredients;
    price: number;
    customer: {
        name: string;
        address: {
            street: string;
            zipCode: string;
            country: string;
        };
        email: string;
    };
    deliveryMethod: string;
}