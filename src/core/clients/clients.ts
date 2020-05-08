import "reflect-metadata";
import { BaseApiRoute, QContext, ApiMethod, Context, CBody, Query } from "../base";
import * as t from "./types-clients";

export class Clients extends BaseApiRoute {
    @ApiMethod()
    getClients(query: t.GetClientsQuery, @Context() ctx: QContext<t.GetClientsQuery> = {}) {
        ctx.query = query;
        return this.queryRunner<{}, t.ClientListItem[]>(ctx);
    }
    @ApiMethod()
    getClient(query: t.GetClientQuery, @Context() ctx: QContext<t.GetClientQuery> = {}) {
        ctx.query = query;
        return this.queryRunner<{}, t.Client[]>(ctx);
    }

    @ApiMethod()
    createClient(@CBody() body: t.CreateClientBody, @Context() ctx: QContext = {}) {
        return this.queryRunner<t.CreateClientBody, string>(ctx);
    }
    @ApiMethod()
    createClients(@CBody() body: t.CreateClientBody[], @Context() ctx: QContext = {}) {
        return this.queryRunner<t.CreateClientBody, string[]>(ctx);
    }

    @ApiMethod()
    updateClient(@CBody() body: t.UpdateClientBody, @Context() ctx: QContext = {}) {
        return this.queryRunner<t.UpdateClientBody, string>(ctx);
    }

    @ApiMethod()
    removeClient(@CBody() body: t.RemoveClientBody, @Context() ctx: QContext = {}) {
        return this.queryRunner<t.RemoveClientBody, boolean>(ctx);
    }
    @ApiMethod()
    removeClients(@CBody() body: t.RemoveClientsBody, @Context() ctx: QContext = {}) {
        return this.queryRunner<t.RemoveClientsBody, t.ClientID[]>(ctx);
    }
}
