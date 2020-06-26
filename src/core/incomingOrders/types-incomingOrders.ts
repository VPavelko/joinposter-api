import { Transactions } from "../transactions/types-transaction";

export namespace IncomingOrder {
    export interface Base {
        spot_id: number;
        client_id?: number;
        first_name?: string;
        last_name?: string;
        phone?: string;
        email?: string;
        sex?: string;
        birthday?: string;
        address?: string;
        comment?: string;
    }
    export interface IncomingOrder extends Base {
        incoming_order_id: number;
        status: number;
        created_at: string;
        updated_at: string;
        transaction_id?: number;
        fiscal_spreading?: string;
        fiscal_method?: string;
        promotion?: string;
        products: Product[];
    }

    export interface Product {
        io_product_id: number;
        product_id: number;
        modificator_id?: number;
        incoming_order_id: number;
        count: number;
        created_at: string;
    }
    /**
        client_id or phone required
    **/
    export interface CreateBody extends Base {
        payment?: PaymentBody;
        promotion?: string;
        products: ProductBody[];
    }

    export interface CreateResult extends Base {
        incoming_order_id: string;
        type: 1 | 2;
        status: 0 | 1 | 7;
        transaction_id?: string;
        fiscal_spreading?: 1 | 2 | 3;
        fiscal_method?: "cash" | "card";
        products: Product[];
    }

    export interface ProductBody {
        product_id: number;
        count: number;
        modificator_id?: string;
        modification?: Transactions.ModificationJson[] | string;
        price?: number;
    }
    /**
        ISO code of the currency of payment, must match the currency of the account
    **/
    export interface PaymentBody {
        type: 0 | 1;
        sum: number;
        currency: string;
    }
    export interface Promotion {
        id: string;
        involved_products: InvolvedProduct[];
        result_products: ResultProduct[];
    }
    export interface InvolvedProduct {
        id: string;
        count: number;
        modification: string;
    }
    export interface ResultProduct {
        id: string;
        count: number;
        modification: string;
    }

    export interface OrdersQuery {
        status: 0 | 1 | 7;
        data_from: string;
        date_to: string;
    }

    export interface OrderQuery {
        incoming_order_id: string;
    }
}
