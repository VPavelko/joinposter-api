export interface AllSettings {
    COMPANY_ID: string;
    FIZ_ADRESS_CITY: string;
    FIZ_ADRESS_PHONE: string;
    uses_tables: number;
    uses_cash_shifts: number;
    uses_taxes: number;
    uses_multiprice: number;
    tip_amount: number;
    uses_bookkeeping: number;
    uses_ipay: number;
    uses_manufacturing: number;
    uses_quick_waiter: number;
    company_name: string;
    company_type: number;
    timezones: string;
    logo: string;
    lang: string;
    pos_phone: string;
    analytics_plus_time: number;
    uses_fiscality: number;
    print_fiscal_by_default: number;
    currency: Currency;
    email: string;
    name: string;
}

export interface Currency {
    currency_id: number;
    currency_name: string;
    currency_code: string;
    currency_symbol: string;
    currency_code_iso: string;
}
