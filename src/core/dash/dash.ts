import "reflect-metadata";
import { BaseApiRoute, QContext, ApiMethod, Context, CBody, Query } from "../base";
import * as t from "./types-dash";

export class Dash extends BaseApiRoute {
    @ApiMethod()
    getTransaction(
        query: t.GetTransactionQuery,
        @Context() ctx: QContext<never, t.GetTransactionQuery> = {},
    ): Promise<t.Transaction[]> {
        ctx.query = query;
        return this.queryRunner<{}, t.Transaction[]>(ctx);
    }

    @ApiMethod()
    getTransactionProducts(
        transaction_id: string,
        @Context() ctx: QContext<never, t.GetTransactionProductsQuery> = {},
    ): Promise<t.TransactionProduct[]> {
        ctx.query = { transaction_id };
        return this.queryRunner<{}, t.TransactionProduct[]>(ctx);
    }

    @ApiMethod()
    getAnalytics(
        query: t.GetAnalyticsQuery,
        @Context() ctx: QContext<never, t.GetAnalyticsQuery> = {},
    ): Promise<t.Analytics> {
        ctx.query = { ...query, dateFrom: this.formateDate(query.dateFrom), dateTo: this.formateDate(query.dateTo) };
        return this.queryRunner<{}, t.Analytics>(ctx);
    }

    @ApiMethod()
    getSpotsSales(
        query: t.GetSpotsSalesQuery,
        @Context() ctx: QContext<never, t.GetSpotsSalesQuery> = {},
    ): Promise<t.SpotsSales> {
        ctx.query = { ...query, dateFrom: this.formateDate(query.dateFrom), dateTo: this.formateDate(query.dateTo) };
        return this.queryRunner<{}, t.SpotsSales>(ctx);
    }

    protected formateDate(date?: Date) {
        if (!date) return undefined;
        const rv = date.toLocaleDateString().split(".").reverse().join("");
        return rv as any;
    }
}
