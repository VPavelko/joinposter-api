import "reflect-metadata";
import { BaseApiRoute, QContext, ApiMethod, Context, CBody, Query } from "../base";
import * as t from "./types-access";

export class Access extends BaseApiRoute {
    @ApiMethod()
    getSpots(@Context() ctx: QContext = {}): Promise<t.Spot[]> {
        return this.queryRunner<{}, t.Spot[]>(ctx);
    }
}
