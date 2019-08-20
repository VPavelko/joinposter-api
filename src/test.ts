import { Poster } from './core';

const poster = new Poster('token');

(async () => {
    await poster.menu.getProducts();
    await poster.menu.getProducts(2);
    await poster.menu.getProducts(3, 'products');
})()
