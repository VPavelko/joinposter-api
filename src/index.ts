
// import { RequestPromiseOptions } from "request-promise";
// import * as request from "request-promise";
// import { UriOptions } from "request";

// const errors = {
//     CANT_CREATE_CHECK: {
//         code: 555,
//         message: `Something went wrong during check commiting.`,
//     },
// };

// export class Poster {
   
    
//      public getProductById(product_id: string): Promise<Poster.Product | undefined> {
//         const ctx: Poster.QueryContext<Poster.GetOneProductQuery> = {
//             method: "GET",
//             apiMethod: "menu.getProduct",
//             query: {
//                 product_id,
//             },
//         };
//         return this.queryRunner<Poster.GetOneProductQuery, Poster.Product>(ctx);
//     }

//     public async createCheck(body: Poster.CreateCheckBody): Promise<Poster.CreateCheckResponse | undefined> {
//         const ctx: Poster.QueryContext<Poster.CreateCheckBody> = {
//             method: "POST",
//             apiMethod: "transactions.createTransaction",
//             body,
//         };
//         const chck = await this.queryRunner<Poster.CreateCheckBody, Poster.CreateCheckResponse>(ctx);
//         return chck;
//     }

//     public async getProductSales(body?: Poster.GetProductSalesBody): Promise<Poster.ProductSales[]> {
//         const ctx: Poster.QueryContext<Poster.GetProductSalesRequest> = {
//             method: "GET",
//             apiMethod: "dash.getProductsSales",
//         };

//         if (body) {
//             const { date_from, date_to, spot_id } = body;
//             const requestBody: Poster.GetProductSalesRequest = {};
//             if (date_from) requestBody.date_from = dateToYmd(date_from);
//             if (date_to) requestBody.date_to = dateToYmd(date_to);
//             if (spot_id) requestBody.spot_id = spot_id;
//             ctx.body = requestBody;
//         }

//         return this.queryRunner<Poster.GetProductSalesRequest, Poster.ProductSales[]>(ctx);
//     }

//     private async mazaFakaGetChildOfCategories(rootCategories: string[]) {
//         const categories = await this.getCategories();
//         if (!categories) return rootCategories;

//         return categories.reduce((acc, item) => {
//             const root = rootCategories.find(category => category === item.parent_category);
//             if (root) acc.push(item.category_id);
//             return acc;
//         }, rootCategories.slice());
//     }

//     public async getFilteredProductSales(body?: Poster.GetProductSalesBody, filter?: Poster.ProductsFilter) {
//         const sales = await this.getProductSales(body);
//         if (!filter || (!filter.categories && filter.products)) return sales;

//         if (filter) {
//             const { products = [], categories: roots = [] } = filter;
//             const categories = await this.mazaFakaGetChildOfCategories(roots);
//             return sales.reduce(
//                 (acc, sale) => {
//                     const { product_id: pId, category_id: cId } = sale;
//                     if (categories.indexOf(cId) !== -1 || products.indexOf(pId) !== -1) {
//                         acc.push(sale);
//                     }
//                     return acc;
//                 },
//                 [] as Poster.ProductSales[],
//             );
//         }
//         return [];
//     }

//     private serializeAddProductBody(body: Poster.AddProductToCheck): Poster.AddProductToCheckBody {
//         const mods = body.modification;
//         const mod = body.modificator_id;

//         const rv: Poster.AddProductToCheckBody = {
//             product_id: body.product_id,
//             spot_id: body.spot_id,
//             transaction_id: body.transaction_id,
//             spot_tablet_id: body.spot_tablet_id,
//         };

//         if (mods) {
//             rv.modification = mods && JSON.stringify(mods.map(mod => ({ m: mod.modification_id, a: mod.count })));
//         }

//         if (mod) {
//             rv.modificator_id = mod;
//         }

//         return rv;
//     }

//     public async addProductToCheck(body: Poster.AddProductToCheck) {
//         const data = this.serializeAddProductBody(body);

//         const ctx: Poster.QueryContext<Poster.AddProductToCheckBody> = {
//             method: "POST",
//             apiMethod: "transactions.addTransactionProduct",
//             body: data,
//         };

//         await this.queryRunner<Poster.AddProductToCheckBody, Poster.AddProductToCheckResponse>(ctx);

//         if (body.count && body.count > 1) {
//             await this.changeCheckProductCount(data, body.count);
//         }
//     }

//     public async getCheck(
//         transaction_id: string,
//         include_history: boolean = false,
//         include_products: boolean = true,
//     ): Promise<Poster.Check | undefined> {
//         const ctx: Poster.QueryContext<Poster.GetCheck> = {
//             apiMethod: "dash.getTransaction",
//             method: "GET",
//             query: {
//                 transaction_id,
//                 include_history,
//                 include_products,
//             },
//         };
//         const check = await this.queryRunner<Poster.GetCheck, Poster.Check[]>(ctx);
//         return check ? check[0] : undefined;
//     }

//     public addCheckComment(body: Poster.AddCommentToCheckBody) {
//         const ctx: Poster.QueryContext<Poster.AddCommentToCheckBody> = {
//             apiMethod: "transactions.changeComment",
//             method: "POST",
//             body,
//         };
//         return this.queryRunner<Poster.AddCommentToCheckBody>(ctx);
//     }

//     public changeCheckProductCount(body: Poster.AddProductToCheckBody, count: number) {
//         const ctx: Poster.QueryContext<Poster.ChangeCheckProductCount> = {
//             method: "POST",
//             apiMethod: "transactions.changeTransactionProductCount",
//             body: {
//                 ...body,
//                 count,
//             },
//         };

//         return this.queryRunner<Poster.ChangeCheckProductCount>(ctx);
//     }

//     public closeCheck(body: Poster.CloseCheckBody) {
//         const ctx: Poster.QueryContext<Poster.CloseCheckBody> = {
//             method: "POST",
//             apiMethod: "transactions.closeTransaction",
//             body,
//         };
//         return this.queryRunner<Poster.CloseCheckBody>(ctx);
//     }

//     public async commitCheck({ products = [], comment }: Poster.CommitCheckBody) {
//         const check = await this.createCheck(orderMockup);
//         if (check) {
//             const checkAttributes = {
//                 spot_id: orderMockup.spot_id,
//                 spot_tablet_id: orderMockup.spot_tablet_id,
//                 transaction_id: check.transaction_id,
//             };

//             for (const { product_id, modificator_id, modification, count } of products) {
//                 const product: Poster.AddProductToCheck = {
//                     transaction_id: check.transaction_id,
//                     spot_id: orderMockup.spot_id,
//                     spot_tablet_id: orderMockup.spot_tablet_id,
//                     product_id,
//                     modification,
//                     modificator_id,
//                     count,
//                 };

//                 if (!product.count) product.count = 1;
//                 await this.addProductToCheck(product);
//             }

//             if (comment) {
//                 await this.addCheckComment({
//                     ...checkAttributes,
//                     transaction_id: check.transaction_id,
//                     comment,
//                 });
//             }

//             const createdCheck = await this.getCheck(check.transaction_id);
//             if (createdCheck) {
//                 await this.closeCheck({
//                     ...checkAttributes,
//                     payed_cash: `${+createdCheck.sum / 100}`,
//                 });
//                 return {
//                     orderId: check.transaction_id,
//                 };
//             }
//         }

//         const { code, message } = errors.CANT_CREATE_CHECK;
//         throw new PosterException(code, message);
//     }

//     public removeCheck(body: Poster.RemoveCheckBody) {
//         const ctx: Poster.QueryContext<Poster.RemoveCheckBody> = {
//             method: "POST",
//             apiMethod: "transactions.removeTransaction",
//             body,
//         };
//         return this.queryRunner<Poster.RemoveCheckBody>(ctx);
//     }

//     public getTables() {
//         const ctx: Poster.QueryContext<any> = {
//             method: "GET",
//             apiMethod: "spots.getTableHallTables",
//         };
//         return this.queryRunner<any, Poster.Table[]>(ctx);
//     }

//     public getDevices() {
//         const ctx: Poster.QueryContext<any> = {
//             method: "GET",
//             apiMethod: "access.getTablets",
//         };
//         return this.queryRunner<any, Poster.Device[]>(ctx);
//     }

//     public getEmployee() {
//         const ctx: Poster.QueryContext<any> = {
//             method: "GET",
//             apiMethod: "access.getEmployees",
//         };
//         return this.queryRunner<any, Poster.Employee[]>(ctx);
//     }
// }

// export namespace Poster {
//     export interface Table {
//         table_id: string;
//         table_num: string;
//         table_title: string;
//         spot_id: string;
//         table_shape: "circle" | "square";
//         hall_id: string;
//         table_x: string;
//         table_y: string;
//         table_height: string;
//         table_width: string;
//         is_deleted: "0" | "1";
//         status: number;
//     }

//     export interface Employee {
//         user_id: number;
//         name: string;
//         login: string;
//         role_name: string;
//         role_id: number;
//         user_type: number;
//         access_mask: number;
//         last_in: string;
//     }

//     export interface Device {
//         tablet_id: string;
//         tablet_name: string;
//         spot_id: string;
//     }



//     export interface PesponseProduct extends BaseProduct {
//         price: { [key: string]: string }[];
//     }

//     export interface Product extends BaseProduct {
//         price: number;
//     }

//     export interface ProductsFilter {
//         products?: string[];
//         categories?: string[];
//     }

   

//     export interface GetProductsQuery {
//         category_id?: string;
//     }

//     export interface GetOneProductQuery {
//         product_id?: string;
//     }

//     export interface CreateCheckBody {
//         spot_id: string;
//         spot_tablet_id: string;
//         table_id: string;
//         user_id: string;
//         guests_count: string;
//     }

//     export interface CreateCheckResponse {
//         transaction_id: string;
//         transaction_tablet_id: string;
//     }

//     interface CheckBaseAttributes {
//         transaction_id: string;
//         spot_id: string;
//         spot_tablet_id: string;
//     }

//     export interface AddProductToCheckBody extends CheckBaseAttributes {
//         product_id: string;
//         modification?: string; // json for tech cards (WTF: because poster)
//         modificator_id?: string; // for simple dish
//     }

//     export interface ChangeCheckProductCount extends AddProductToCheckBody {
//         count: number;
//     }

//     export interface CommitCheckBody {
//         products: {
//             product_id: string;
//             modification?: ProductModification[];
//             modificator_id?: string;
//             count?: number;
//         }[];
//         comment?: string;
//     }

//     export interface AddProductToCheck extends CheckBaseAttributes {
//         product_id: string;
//         modificator_id?: string;
//         modification?: ProductModification[];
//         count?: number;
//     }

//     export interface ProductModification {
//         modification_id: string;
//         count: number;
//     }

//     export interface AddProductToCheckResponse {
//         transaction_product: string;
//     }

//     export interface GetCheck {
//         transaction_id: string;
//         include_products: boolean;
//         include_history: boolean;
//     }

//     export interface CheckPorduct {
//         product_id: string;
//         num: string;
//         product_price: string;
//         modification_id: string;
//         payed_sum: string;
//         product_cost: string;
//         product_profit: string;
//     }

//     export interface Check {
//         transaction_id: string;
//         date_start: string;
//         date_start_new: string;
//         date_close: string;
//         status: string;
//         guests_count: string;
//         discount: string;
//         bonus: string;
//         pay_type: string;
//         payed_bonus: string;
//         payed_card: string;
//         payed_cash: string;
//         payed_sum: string;
//         payed_cert: string;
//         payed_third_party: string;
//         round_sum: string;
//         tip_sum: string;
//         sum: string;
//         spot_id: string;
//         table_id: string;
//         name: string;
//         user_id: string;
//         client_id: string;
//         card_number: string;
//         transaction_comment: string;
//         reason: string;
//         table_name: string;
//         client_firstname: string;
//         client_lastname: string;
//         date_close_date: string;
//         products: CheckPorduct[];
//     }

//     export interface CloseCheckBody extends CheckBaseAttributes {
//         payed_cash?: string;
//         payed_card?: string;
//         payed_cert?: string;
//         reason?: "1" | "2" | "3";
//     }

//     export interface AddCommentToCheckBody extends CheckBaseAttributes {
//         comment: string;
//     }

//     export interface RemoveCheckBody {
//         spot_tablet_id: string;
//         transaction_id: string;
//         user_id: string;
//     }
// }
