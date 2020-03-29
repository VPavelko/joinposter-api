import { RequestPromiseOptions } from "request-promise";
import request from "request-promise";
import { UriOptions } from "request";
import { Log } from '@uk/log';

import { PosterException } from './errors';

export interface QContext<TBody extends Object = never, TQuery extends Object = TBody> {
    method?: "GET" | "POST";
    apiMethod?: string;
    body?: TBody;
    query?: TQuery;
}

export type Query = RequestPromiseOptions & UriOptions;

enum LogLevel {
    INFO = 1,
    DEBUG = 2,
}

export interface PosterOptions {
    logLevel?: LogLevel;
} 

export abstract class BaseApiRoute {
    protected static readonly urlPrefix = "https://joinposter.com/api";
    static route: string;
    log: Log;

    constructor(
        protected readonly token: string,
        protected options?: PosterOptions,
    ) {
        this.log = new Log(this.constructor.name.toUpperCase());
    }

    protected async queryRunner<T extends object, R = void>(ctx: QContext<T>): Promise<R> {
        if (this.options?.logLevel === LogLevel.DEBUG) {
            this.log.debug('Query runner got ctx', { ctx });
        }
        
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
            const thiz = this as BaseApiRoute;
            const options = thiz['options'] as PosterOptions;

            const debug = options?.logLevel === LogLevel.DEBUG;
            const info = options?.logLevel === LogLevel.INFO;
            
            info && thiz.log.info(`Called ${propertyKey} method`);
            debug && thiz.log.debug(`Called ${propertyKey} method`, { args });

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

            debug && thiz.log.debug('Generated context', { ctx });

            return defaultMethod.call(this, ...args)
                .then((result: any) => {
                    debug && thiz.log.debug(`Method ${propertyKey} got result`, { result });

                    return result;
                })
                .catch((err: Error) => {
                    debug && thiz.log.debug(`Method ${propertyKey} got error`, { err });

                    throw err;
                });
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