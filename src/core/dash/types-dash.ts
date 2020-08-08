export interface GetTransactionQuery {
    transaction_id: string;
    include_history?: boolean;
    include_products?: boolean;
    timezone?: "client";
    type?: "waiters" | "spots" | "clients";
    id?: string;
    status?: "0" | "1" | "2" | "3";
}

export interface Transaction {
    transaction_id: string;
    date_start: string;
    date_start_new: string;
    date_close: string;
    status: string;
    guests_count: string;
    discount: string;
    bonus: string;
    pay_type: "0" | "1" | "2" | "3";
    payed_bonus: string;
    payed_card: string;
    payed_cash: string;
    payed_sum: string;
    payed_cert: string;
    payed_third_party: string;
    round_sum: string;
    tip_sum: string;
    tips_card: string;
    tips_cash: string;
    sum: string;
    spot_id: string;
    table_id: string;
    name: string;
    user_id: string;
    client_id: string;
    card_number: string;
    transaction_comment: string | null;
    reason: "1" | "2" | "3";
    print_fiscal: "0" | "1" | "2";
    total_profit: string;
    total_profit_netto: string;
    table_name: string;
    client_firstname: string | null;
    client_lastname: string | null;
    date_close_date: string;
    products: Product[];
    history: History[];
}

export interface Product {
    product_id: "162";
    modification_id: "0";
    num: "1";
    product_price: "1050";
    payed_sum: "1050";
    product_cost: "4536";
    product_cost_netto: "3780";
    product_profit: "-3486";
    product_profit_netto: "-2905";
}

export type HistoryType =
    | "open"
    | "comment"
    | "close"
    | "delete"
    | "print"
    | "sendtokitchen"
    | "additem"
    | "settable"
    | "changeitemcount"
    | "deleteitem"
    | "setclient";

export interface History {
    history_id: string;
    type_history: HistoryType;
    spot_tablet_id: string;
    time: string;
    user_id: string;
    value: string;
    value2: string;
    value3: string;
    value4: string;
    value5: string;
    value_text: string | null;
}

export interface GetTransactionProductsQuery {
    transaction_id: string;
}
export interface TransactionProduct {
    product_id: string;
    product_name: string;
    modification_id: string;
    modificator_name: string;
    modificator_barcode: string;
    modificator_product_code: string;
    weight_flag: string;
    num: string;
    time: string;
    workshop: string;
    barcode: string;
    product_code: string;
    tax_id: string;
    fiscal: "0" | "1";
    nodiscount: "0" | "1";
    payed_sum: string;
    product_sum: string;
    discount: string;
    bonus_sum: string;
    round_sum: string;
    client_id: string;
    promotion_id: string;
    cert_sum: string;
    product_cost: string;
    product_cost_netto: string;
    product_profit: string;
    product_profit_netto: string;
    bonus_accrual: string;
    tax_value: string;
    tax_type: "1" | "2";
    tax_fiscal: string;
    category_id: string;
}

export interface GetAnalyticsQuery {
    dateFrom?: Date;
    dateTo?: Date;
    interpolate?: "day" | "week" | "month";
    select?: "revenue" | "profit" | "average_receipt" | "transactions" | "visitors" | "average_time";
    type?: "waiters" | "workshops" | "category" | "products" | "spots" | "clients";
    id?: string;
    business_day: boolean;
}
export interface Analytics {
    counters?: {
        revenue: string;
        profit: string;
        transactions: string;
        visitors: string;
        average_receipt: number;
        average_time: string;
    };
}

export interface GetSpotsSalesQuery {
    dateFrom?: Date;
    dateTo?: Date;
    spot_id?: number | string;
}

export interface SpotsSales {
    revenue: number;
    profit: number;
    profit_netto: number;
    clients: number;
    middle_invoice: number;
}
