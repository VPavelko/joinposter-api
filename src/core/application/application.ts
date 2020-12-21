import "reflect-metadata";
import { BaseApiRoute, QContext, ApiMethod, Context } from "../base";
import * as t from "./types-application";

export class Application extends BaseApiRoute {
    @ApiMethod()
    getInfo(@Context() ctx: QContext = {}): Promise<t.Info> {
        return this.queryRunner<{}, t.Info>(ctx);
    }
}
