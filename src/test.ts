import { Poster } from ".";

const poster = new Poster(
    process.env.TOKEN || '',
    { logLevel: 2 },
);

(async () => {
    await poster.menu.getProducts(21);
    // await poster.menu.getProducts(2);
    // await poster.menu.getProducts(3, "products");
    await poster.access.getSpots();
    await poster.menu.getProduct(233)
})();
