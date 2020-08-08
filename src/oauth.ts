import * as rp from "request-promise";

export namespace OAuth {
    export interface UrlParams {
        applicationId: string;
        redirectUri: string;
        account?: string;
    }
    export function createUrl(params: UrlParams) {
        const { account, applicationId, redirectUri } = params;
        return `https://${
            account ? `${account}.` : ""
        }joinposter.com/api/auth?application_id=${applicationId}&redirect_uri=${redirectUri}&response_type=code`;
    }
    function createAccessUrl(account: string) {
        return `https://${account}.joinposter.com/api/v2/auth/access_token`;
    }
    export type Props = {
        id: string;
        secret: string;
        account: string;
        code: string;
        redirect: string;
    };
    export interface Data {
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
    export interface Error {
        code: number;
        error_type: string;
        error_message: string;
    }
    export async function getAccessToken(props: OAuth.Props) {
        const { account, code, id, secret, redirect } = props;
        try {
            const response = await rp.post(createAccessUrl(account), {
                formData: {
                    grant_type: "authorization_code",
                    application_id: id,
                    application_secret: secret,
                    redirect_uri: redirect,
                    code,
                },
            });
            const rv = JSON.parse(response) as OAuth.Data | OAuth.Error;
            if ("error_type" in rv) {
                throw new Error(rv.error_message);
            } else {
                return rv;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}
