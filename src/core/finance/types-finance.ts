export interface GetCashShiftsQuery {
    spot_id?: string;
    dateFrom?: Date;
    dateTo?: Date;
    timezone?: "client";
}

export interface CashShift {
    cash_shift_id: string;
    spot_id: string;
    timestart: string;
    timeend: string;
    date_start: string;
    date_end: string;
    amount_start: string;
    amount_end: string;
    amount_debit: string;
    amount_sell_cash: string;
    amount_sell_card: string;
    amount_credit: string;
    amount_collection: string;
    user_id_start: string;
    user_id_end: string;
    comment: string;
    spot_name: string;
    spot_adress: string;
    table_num: string;
}
