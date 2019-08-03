import { Poster } from './core';

const poster = new Poster('token');

(async () => {
     poster.menu.updateCategory({ category_id: 1, parent_category: 0, category_name: 'name' });
//    const test = await poster.menu.getCategories();    
 //   await poster.menu.getProducts(3);
  //  await poster.menu.getProducts();
    // await poster.menu.getCategory(1);

})()
