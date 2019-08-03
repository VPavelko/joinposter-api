import 'reflect-metadata';
import { BaseApiRoute, QContext, ApiMethod, Context } from '../base';
import * as t from './types-menu';

export class Menu extends BaseApiRoute {
    
    @ApiMethod()
    getCategories(ctx: QContext = {}): Promise<t.Category[]> {
        return this.queryRunner<{}, t.Category[]>(ctx);
    }

    @ApiMethod()
    getCategory(category_id: number, @Context() ctx: QContext<t.GetCategoryQuery> = {}): Promise<t.Category> {
        ctx.query = { category_id };
        return this.queryRunner<t.GetCategoryQuery, t.Category>(ctx);
    }

    @ApiMethod()
    createCategory(body: t.CreateCategoryBody, @Context() ctx: QContext<t.CreateCategoryBody> = {}) {
        ctx.body = body;
        return this.queryRunner<t.CreateCategoryBody, string>(ctx);
    }

    @ApiMethod()
    updateCategory(body: t.UpdateCategoryBody, @Context() ctx: QContext<t.UpdateCategoryBody> = {}): Promise<string> {
        ctx.body = body;

        console.log(`update`, ctx);
        return Promise.resolve('');
        //return this.queryRunner<t.UpdateCategoryBody, string>(ctx);
    }

    @ApiMethod()
    getProducts(category_id?: number, @Context() ctx: QContext<never, t.GetProductsQuery> = {}): Promise<t.Product[]> {
        if (category_id) {
            ctx.query = { category_id };
        }
        
        return this.queryRunner<t.GetProductsQuery, t.Product[]>(ctx);
    }

    @ApiMethod()
    removeCategory(category_id: number, @Context() ctx: QContext<t.RemoveCategoryBody> = {}) {
        ctx.body = { category_id };
        return this.queryRunner<t.RemoveCategoryBody>(ctx);
    }
}