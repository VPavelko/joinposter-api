import md5 from "md5";
import * as rp from "request-promise";

export namespace Manage {
    const authUrl = "https://joinposter.com/api/v2/auth/manage";
    export async function auth(props: AuthProps) {
        const { id, secret, code } = props;
        const verify = md5(`${id}:${secret}:${code}`);
        console.log({ id, secret, code, verify });
        try {
            const response = await rp.post(authUrl, {
                formData: {
                    application_id: id,
                    application_secret: secret,
                    code,
                    verify,
                },
            });
            const rv = JSON.parse(response) as Manage.AuthData | Manage.AuthError;
            if ("error" in rv) {
                throw new Error(rv.message);
            } else {
                return rv;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    export interface AuthProps {
        id: string;
        secret: string;
        code: string;
    }
    export interface AuthData {
        access_token: string;
        account_number: string;
        user: {
            id: number;
            name: string;
            email: string;
            role_id: number;
        };
        ownerInfo: {
            email: string;
            phone: string;
            city: string;
            country: string;
            name: string;
            company_name: string;
        };
        tariff: {
            key: string;
            next_pay_date: string;
            price: number;
        };
    }
    export interface AuthError {
        error: number;
        message: string;
        field: string;
    }
}
