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

    @ApiMethod()
    getProductsSales(
        query: t.GetProductsSalesQuery,
        @Context() ctx: QContext<never, t.GetProductsSalesQuery> = {},
    ): Promise<t.ProductSales[]> {
        ctx.query = {
            ...query,
            date_from: this.formateDate(query.date_from),
            date_to: this.formateDate(query.date_to),
        };
        return this.queryRunner<{}, t.ProductSales[]>(ctx);
    }
}
