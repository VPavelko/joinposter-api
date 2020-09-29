import "reflect-metadata";
import { BaseApiRoute, QContext, ApiMethod, Context } from "../base";
import * as t from "./types-finance";

export class Finance extends BaseApiRoute {
    @ApiMethod()
    getCashShifts(
        query?: t.GetCashShiftsQuery,
        @Context() ctx: QContext<never, t.GetCashShiftsQuery> = {},
    ): Promise<t.CashShift[]> {
        ctx.query = { ...query, dateFrom: this.formateDate(query?.dateFrom), dateTo: this.formateDate(query?.dateTo) };
        return this.queryRunner<{}, t.CashShift[]>(ctx);
    }
}
