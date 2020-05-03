import "reflect-metadata";
import { Transactions as t } from "./types-transaction";
import { BaseApiRoute, QContext, ApiMethod, Context, CBody } from "../base";

export class Transactions extends BaseApiRoute {
    @ApiMethod()
    createTransaction(
        @CBody() body: t.CreateTransactionBody,
        @Context() ctx: QContext = {},
    ): Promise<t.CreateTransactionResponse> {
        return this.queryRunner<t.CreateTransactionBody, t.CreateTransactionResponse>(ctx);
    }

    private modificationTransform(mods: t.ProductModification[]): t.ModificationJson[] {
        return mods.map((item) => ({
            m: +item.modification_id,
            a: +item.count,
        }));
    }

    @ApiMethod()
    async addTransactionProduct(
        product: t.AddProductToTransaction,
        @Context()
        ctx: QContext<t.AddProductToTransactionBody> = {},
    ): Promise<t.AddProductTransactionResponse> {
        const { count, modification, modificator_id, ...baseBody } = product;
        const body: t.AddProductToTransactionBody = {
            ...baseBody,
        };

        if (modificator_id) {
            body.modificator_id = modificator_id;
        }

        if (modification) {
            body.modification = JSON.stringify(this.modificationTransform(modification));
        }

        ctx.body = body;

        const result = await this.queryRunner<t.AddProductToTransactionBody, t.AddProductTransactionResponse>(ctx);

        if (!count || count === 1) {
            return result;
        }

        return this.changeTransactionProductCount({ ...body, count });
    }

    @ApiMethod()
    changeTransactionProductCount(
        @CBody() body: t.ChangeProductTransactionCountBody,
        @Context() ctx: QContext = {},
    ): Promise<t.AddProductTransactionResponse> {
        return this.queryRunner<t.ChangeProductTransactionCountBody, t.AddProductTransactionResponse>(ctx);
    }

    @ApiMethod()
    changeComment(@CBody() body: t.ChangeCommentToCheckBody, @Context() ctx: QContext = {}) {
        return this.queryRunner<t.ChangeCommentToCheckBody>(ctx);
    }

    @ApiMethod()
    public removeTransaction(@CBody() body: t.RemoveTransactionBody, @Context() ctx: QContext = {}) {
        return this.queryRunner<t.RemoveTransactionBody>(ctx);
    }

    @ApiMethod()
    public closeTransaction(@CBody() body: t.CloseTransactionBody, @Context() ctx: QContext = {}) {
        return this.queryRunner<t.CloseTransactionBody>(ctx);
    }

    @ApiMethod()
    public removeTransactionProduct(@CBody() body: t.RemoveTransactionProductBody, @Context() ctx: QContext = {}) {
        return this.queryRunner<t.RemoveTransactionProductBody>(ctx);
    }
}
