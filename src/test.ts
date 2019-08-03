import { Poster } from './core';

const poster = new Poster('token');

(async () => {
    const test = await poster.menu.getCategories();
    
    await poster.menu.getProducts(3);
    await poster.menu.getProducts();

    await poster.menu.getCategory(1);
})()
