import 'reflect-metadata';
import * as types from './types-menu';
import { BaseApiRoute, QueryContext } from '../base';

function ApiMethod(method: 'GET' | 'POST') {

    console.log(`decorated metho`)
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {        
        const defaultMethod = target[propertyKey];
        const route = target.constructor.route;

        descriptor.value = function(...args: any[]) {
            const ctx: QueryContext = {
                apiMethod: `${route}.${propertyKey}`,
                method,
            }
            
          console.log(`Apimethod`, args);
          args.push(ctx);
            return defaultMethod.call(target, ...args);
        }
    }
}

function Context() {
    console.log(`decorated arg`)
    return function(target: any, propertyKey: string | symbol, index: number) {
        const method = target[propertyKey]; 

        target[propertyKey] = function(...args: any[]) {
            console.log(`args.length `, args.length, `index `, index);
            
            // while (args.length - 1  < index) {
            //     args.push(undefined);
            //     console.log(`pushed undefined`);
            // }

            const ctxIndex = args.findIndex((arg) => arg.method);
            
            if (ctxIndex !== index) {
                const ctx = args[ctxIndex];
                console.log(propertyKey, { ctx }, 'd');
                args[ctxIndex] = undefined;
                const pushed = args.push(ctx);

                if (pushed -1 !== index) console.log(`WTF`);
            } 

            // console.log(`Decorated ctx `, ctx);

            console.log(`Finished `, args);
            return method.call(target, ...args);
        }
    }
}

export class MenuApiRoute extends BaseApiRoute {
    static route = 'menu';

    @ApiMethod('GET')
    public getCategories(@Context() ctx: QueryContext<types.GetCategoryQuery> = {}): Promise<types.Category[]> {
        // return this.queryRunner<{}, types.Category[]>({ method: "GET", apiMethod: "menu.getCategories" });
        console.log('getCategories', { ctx });
        return Promise.resolve([]);
    }

    @ApiMethod('GET')
    public getCategory(category_id: number, @Context() ctx: QueryContext<types.GetCategoryQuery> = {}): Promise<types.Category> {

        ctx.query = { category_id };
        console.log(arguments)

        // const ctx: QueryContext<types.GetCategoryQuery> = {
        //     method: "GET",
        //     query: {
        //         category_id,
        //     },
        //     apiMethod: "menu.getCategory",
        // };

        console.log('getCategory', { ctx })
        //return this.queryRunner<types.GetCategoryQuery, types.Category>(ctx);
        return Promise.resolve({} as types.Category);
    }

    public createCategory(body: types.CreateCategoryBody) {
        const ctx: QueryContext<types.CreateCategoryBody> = {
            apiMethod: 'menu.createCategory',
            method: 'POST',
            body,
        };

        return this.queryRunner<types.CreateCategoryBody, string>(ctx);
    }

    public updateCategory(body: types.UpdateCatagoryBody) {}

    @ApiMethod('GET')
    public getProducts(category_id?: number, @Context() ctx: any = {}): Promise<types.Product[]> {
        
        // const ctx: QueryContext<types.GetProductsQuery> = {
        //     method: "GET",
        //     apiMethod: "menu.getProducts",
        // };

        if (category_id) {
            ctx.query = { category_id };
        }

        console.log(`getProducts`, { ctx });
        return Promise.resolve([]);
      //  return this.queryRunner<types.GetProductsQuery, types.Product[]>(ctx);
    }
}