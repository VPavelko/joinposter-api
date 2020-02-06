import "reflect-metadata";
import { BaseApiRoute, QContext, ApiMethod, Context, CBody, Query } from "../base";
import * as t from "./types-dash";

export class Dash extends BaseApiRoute {
    @ApiMethod()
    getTransaction(
        query: t.GetTransactionQuery,
        @Context() ctx: QContext<never, t.GetTransactionQuery> = {},
    ): Promise<t.Transaction> {
        ctx.query = query;
        return this.queryRunner<{}, t.Transaction>(ctx);
    }
    @ApiMethod()
    getTransactionProducts(
        transaction_id: string,
        @Context() ctx: QContext<never, t.GetTransactionProductsQuery> = {},
    ): Promise<t.TransactionProduct[]> {
        ctx.query = { transaction_id };
        return this.queryRunner<{}, t.TransactionProduct[]>(ctx);
    }
}
