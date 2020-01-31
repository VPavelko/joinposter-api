import "reflect-metadata";
import { BaseApiRoute, QContext, ApiMethod, Context, CBody, Query } from "../base";
import * as t from "./types-settings";

export class Settings extends BaseApiRoute {
    @ApiMethod()
    getAllSettings(@Context() ctx: QContext = {}): Promise<t.AllSettings> {
        return this.queryRunner<{}, t.AllSettings>(ctx);
    }
}
