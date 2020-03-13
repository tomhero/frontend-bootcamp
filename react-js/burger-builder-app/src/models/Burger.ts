export enum Ingredient {
    BreadBottom= "bread-bottom",
    BreadTop = "bread-top",
    Meat = "meat",
    Cheese = "cheese",
    Salad = "salad",
    Bacon = "bacon"
}

type amount = number | boolean;

export type OrderableIngredients = {
    // This tell type script to use `string` type as indexing
    [salad: string]: amount;
    bacon: amount;
    cheese: amount;
    meat: amount;
}

export type BurgerBuilderState = {
    ingredients: OrderableIngredients;
    totalPrice: number;
    pusrchasable: boolean;
}

export type BurgerControls = {
    [label: string]: string;
    type: Ingredient;
}[]

export type BuildControlsProp = {
    ingredientAdded: (type: Ingredient) => void;
    ingredientRemoved: (type: Ingredient) => void;
    disabled: OrderableIngredients;
    price: number;
    purchasable: boolean;
}

export type BuildControlProp = {
    label: string;
    added: () => void;
    removed: () => void;
    disabled: boolean | undefined;
}