export enum Ingredient {
    BreadBottom= "bread-bottom",
    BreadTop = "bread-top",
    Meat = "meat",
    Cheese = "cheese",
    Salad = "salad",
    Bacon = "bacon"
}

export type OrderableIngredients = {
    // This tell type script to use `string` type as indexing
    [salad: string]: number;
    bacon: number;
    cheese: number;
    meat: number;
}

export type BurgerBuilderState = {
    ingredients: OrderableIngredients,
    totalPrice: number
}

export type BurgerControls = {
    [label: string]: string;
    type: Ingredient;
}[]

export type BuildControlsProp = {
    ingredientAdded: (type: Ingredient) => void;
}

export type BuildControlProp = {
    label: string;
    added: () => void;
}