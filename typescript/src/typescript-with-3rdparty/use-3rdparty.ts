import "reflect-metadata";
import { plainToClass } from "../../node_modules/class-transformer/index";
import { validate } from "../../node_modules/class-validator/index";

import _ from 'lodash';
import { Product } from "./product.model";

declare var MY_VALUE: any;

console.log(MY_VALUE);

console.log(_.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));

const products = [
    {title: 'cosmos', price: 256},
    {title: 'ELAA', price: 126}
];

// const p1 = new Product('book', 69.99);

// const loadedProducts = products.map(product => {
//     return new Product(product.title, product.price)
// })

// load with class class-transformer
const loadedProducts = plainToClass(Product, products);

const newProd = new Product('testestsetestset', -789);

console.log('loadedProducts', loadedProducts[0]);

validate(newProd).then(error => {
    if (error.length > 0) {
        console.log('Error validation');
        console.log(error);
    }
    console.log(newProd.getInformation());
})

