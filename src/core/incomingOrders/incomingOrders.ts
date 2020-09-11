import "reflect-metadata";
import { BaseApiRoute, QContext, ApiMethod, Context, CBody, Query } from "../base";
import { IncomingOrder as t } from "./types-incomingOrders";

export class IncomingOrders extends BaseApiRoute {
    @ApiMethod()
    createIncomingOrder(@CBody() body: t.CreateBody, @Context() ctx: QContext = {}): Promise<t.IncomingOrder> {
        return this.queryRunner<t.CreateBody, any>(ctx);
    }

    @ApiMethod()
    getIncomingOrder(id: string, @Context() ctx: QContext<never, t.OrderQuery> = {}): Promise<t.IncomingOrder> {
        ctx.query = { incoming_order_id: id };
        return this.queryRunner<{}, t.IncomingOrder>(ctx);
    }

    @ApiMethod()
    getIncomingOrders(
        args: t.OrdersQuery,
        @Context() ctx: QContext<never, t.OrdersQuery> = {},
    ): Promise<[t.IncomingOrder]> {
        ctx.query = args;
        return this.queryRunner<{}, [t.IncomingOrder]>(ctx);
    }
}
