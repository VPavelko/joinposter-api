import { RequestPromiseOptions } from "request-promise";
import request from "request-promise";
import { UriOptions } from "request";

import { PosterException } from './errors';

export interface QContext<TBody extends Object = never, TQuery extends Object = TBody> {
    method?: "GET" | "POST";
    apiMethod?: string;
    body?: TBody;
    query?: TQuery;
}

export type Query = RequestPromiseOptions & UriOptions;

export abstract class BaseApiRoute {
    protected static readonly urlPrefix = "https://joinposter.com/api";
    static route: string;

    constructor(protected readonly token: string) {
    }

    protected async queryRunner<T extends object, R = void>(ctx: QContext<T>): Promise<R> {
        const query: Query = {
            uri: `${BaseApiRoute.urlPrefix}/${ctx.apiMethod}`,
            method: ctx.method,
            qs: {
                token: this.token,
                ...(ctx.query || {}),
            },
            simple: true,
            json: true,
        };
    
        if (ctx.method === "POST" && ctx.body) {
            query["formData"] = ctx.body;
        }
        
        const body = await request(query);
        
        if (body.error) {
            const { error: code, message } = body;
            throw new PosterException(code, message);
        }
    
        const response = body.response;
    
        if (response === false) throw new PosterException(404, `Not found entity for this query.`);
    
        if (response.err_code) {
            const msg = `Got error at ${ctx.apiMethod}. Response body: ${JSON.stringify(body.response)}`;
            throw new PosterException(response.err_code, msg);
        }
    
        if (response.err_code === 0) return null as any;
    
        return body.response as R;
    }
}

export function ApiMethod() {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {        
        const defaultMethod = target[propertyKey];
        const route = target.constructor.name.toLowerCase();    
        const meta = Reflect.getMetadata(propertyKey, target);

        descriptor.value = function(...args: any[]) {
            const ctx: QContext = {
                apiMethod: `${route}.${propertyKey}`,
                method: propertyKey.includes('get') ? 'GET' : 'POST',
            }

            if (meta) {
                const { bodyIndex, ctxIndex } = meta;
                if (bodyIndex !== undefined) {
                    ctx.body = args[bodyIndex];
                }

                args[ctxIndex || 0] = ctx;
            }

            return defaultMethod.call(this, ...args);
        }
    }
}

export function Context() {
    return function(target: any, propertyKey: string | symbol, ctxIndex: number) {
        let metadata = Reflect.getMetadata(propertyKey, target);
        if (!metadata) {
            Reflect.defineMetadata(propertyKey, { ctxIndex }, target);
        } else {
            metadata.ctxIndex = ctxIndex;
        }
    }
}

export function CBody() {
    return function(target: any, propertyKey: string | symbol, bodyIndex: number) {   
        let metadata = Reflect.getMetadata(propertyKey, target);
        if (!metadata) {
            Reflect.defineMetadata(propertyKey, { bodyIndex }, target);
        } else {
            metadata.bodyIndex = bodyIndex;
        }
    }
}