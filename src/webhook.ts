import md5 from "md5";

export namespace Webhook {
    export function verify(body: Body, secret: string) {
        const verifyOriginal = body.verify;
        const verify = [body.account, body.object, body.object_id, body.action];
        if (body.data) {
            verify.push(body.data);
        }
        verify.push(body.time);
        verify.push(secret);
        const verifyMd5 = md5(verify.join(";"));
        if (verifyMd5 !== verifyOriginal) {
            return new Error("Webhook is not verified");
        } else {
            return body;
        }
    }
    export interface Verify {
        account: string;
        object: string;
        object_id: number;
        action: "added" | "changed" | "removed" | "transformed";
        time: string;
        client_secret: string;
        data?: ApplicationData | StockData;
    }
    export interface Body {
        account: string;
        account_number: string;
        object: string;
        object_id: number;
        action: "added" | "changed" | "removed" | "transformed";
        time: string;
        verify: string;
        data?: any;
    }

    export interface ApplicationData {
        user_id: string;
        access_token: string;
    }
    export interface StockData {
        type: 1 | 2 | 3 | 4 | 5;
        element_id: string;
        storage_id: string;
        value_relative: number;
        value_absolute: number;
    }
}
