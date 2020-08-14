import "reflect-metadata";
import { BaseApiRoute, QContext, ApiMethod, Context, CBody, Query } from "../base";
import * as t from "./types-menu";

export class Menu extends BaseApiRoute {
    @ApiMethod()
    getCategories(@Context() ctx: QContext = {}): Promise<t.Category[]> {
        return this.queryRunner<{}, t.Category[]>(ctx);
    }

    @ApiMethod()
    getCategory(category_id: number, @Context() ctx: QContext<t.GetCategoryQuery> = {}): Promise<t.Category> {
        ctx.query = { category_id };
        return this.queryRunner<t.GetCategoryQuery, t.Category>(ctx);
    }

    @ApiMethod()
    createCategory(@CBody() body: t.CreateCategoryBody, @Context() ctx: QContext<t.CreateCategoryBody> = {}) {
        return this.queryRunner<t.CreateCategoryBody, string>(ctx);
    }

    @ApiMethod()
    updateCategory(
        @CBody() body: t.UpdateCategoryBody,
        @Context() ctx: QContext<t.UpdateCategoryBody> = {},
    ): Promise<string> {
        return this.queryRunner<t.UpdateCategoryBody, string>(ctx);
    }

    @ApiMethod()
    removeCategory(@CBody() category_id: number, @Context() ctx: QContext<t.RemoveCategoryBody> = {}) {
        return this.queryRunner<t.RemoveCategoryBody>(ctx);
    }

    @ApiMethod()
    getProducts(
        category_id?: number,
        type?: t.GetProductType,
        @Context() ctx: QContext<never, t.GetProductsQuery> = {},
    ): Promise<t.Product[]> {
        const query: t.GetProductsQuery = {};

        if (category_id !== undefined) {
            query.category_id = category_id;
        }
        type && (query.type = type);

        if (category_id !== undefined || type) {
            ctx.query = query;
        }
        return this.queryRunner<t.GetProductsQuery, t.Product[]>(ctx);
    }

    @ApiMethod()
    getProduct(product_id: number, @Context() ctx: QContext<never, t.GetProductQuery> = {}): Promise<t.Product> {
        const query: t.GetProductQuery = {
            product_id,
        };
        ctx.query = query;
        return this.queryRunner<t.GetProductQuery, t.Product>(ctx);
    }

    private multipartArrays = ["barcode", "product_code", "modificator_name", "cost", "price", "visible"];

    @ApiMethod()
    createProduct(
        body: t.CreateProductBody,
        @Context() ctx: QContext<t.CreateProductBody> = {},
    ): Promise<string | t.CreateProductResponse> {
        if (body.modifications) {
            for (const key of this.multipartArrays) {
                const data = (body as any)[key];
                if (data) {
                    if (!Array.isArray(data)) {
                        throw new Error(`If modifications == ${body.modifications} then ${key} should be an array!`);
                    }

                    data.forEach((value, index) => {
                        (data as any)[`${key}[${index}]`] = value;
                    });
                    (body as any)[key] = undefined;
                }
            }
        }

        return this.queryRunner<t.CreateProductBody, t.CreateProductResponse>(ctx);
    }
}
