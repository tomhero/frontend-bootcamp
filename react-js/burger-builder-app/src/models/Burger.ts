export enum Ingredient {
    BreadBottom= "bread-bottom",
    BreadTop = "bread-top",
    Meat = "meat",
    Cheese = "cheese",
    Salad = "salad",
    Bacon = "bacon"
}

export type BurgerBuilderState = {
    ingredients: {
        salad: number;
        bacon: number;
        cheese: number;
        meat: number;
    }
}
