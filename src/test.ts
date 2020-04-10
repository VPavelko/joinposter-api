import { Poster } from "./core";

const poster = new Poster(
    process.env.TOKEN || '',
    { logLevel: 2 },
);

(async () => {
    await poster.menu.getProducts();
    await poster.menu.getProducts(2);
    await poster.menu.getProducts(3, "products");
    await poster.access.getSpots();
})();
