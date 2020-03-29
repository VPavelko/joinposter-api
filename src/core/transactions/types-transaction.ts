import { Omit } from '../../helpers';  

export namespace Transactions {
  interface TransactionBase {
    transaction_id: string;
    spot_id: string;
    spot_tablet_id: string;
  }

  export interface Transaction extends Omit<TransactionBase, 'spot_tablet_id'> {
    date_start: string;
    date_start_new: string;
    date_close: string;
    status: string;
    guests_count: string;
    discount: string;
    bonus: string;
    pay_type: string;
    payed_bonus: string;
    payed_card: string;
    payed_cash: string;
    payed_sum: string;
    payed_cert: string;
    payed_third_party: string;
    round_sum: string;
    tip_sum: string;
    sum: string;
    table_id: number;
    name: string;
    user_id: string;
    client_id: string;
    card_number: string;
    transaction_comment: string;
    reason: string;
    table_name: string;
    client_firstname: string;
    client_lastname: string;
    date_close_date: string;
    products:   TransactionProduct[];
  }

  export interface TransactionProduct {
    product_id: string;
    num: string;
    product_price: string;
    modification_id: string;
    payed_sum: string;
    product_cost: string;
    product_profit: string;
    product_sum: string;
    type: '2' | '3';
    workshop_id: string;
    cert_sum: string;
    bonus_sum: string;
    bonus_accrual: string;
    round_sum: string;
    discount: string;
    tax_fiscal: string;
  }

  export interface CreateTransactionBody extends Omit<TransactionBase, 'transaction_id'> {
    table_id: number;
    user_id: number;
    guests_count: number;
  }

  export interface CreateTransactionResponse {
    transaction_id: number;
    transaction_tablet_id: number;
  }

  export interface ChangeTransactionProductCount extends AddProductToTransaction {
    count: number;
  }

  export interface AddProductTransactionResponse {
    transaction_product: string;
}

  export interface AddProductToTransaction extends TransactionBase {
    product_id: string;
    modificator_id?: string;
    modification?: ProductModification[];
    count?: number;
  }

  export interface AddProductToTransactionBody extends TransactionBase {
    product_id: string;
    modificator_id?: string;
    modification?: string;
  }

  export interface ChangeProductTransactionCountBody extends TransactionBase {
    product_id: string;
    modificator_id?: string;
    modification?: string;
    count: number;
  }

  export interface ModificationJson {
    m: number;
    a: number;
  }

  export interface ProductModification {
    modification_id: string;
    count: number;
  }
  
  export interface ChangeCommentToCheckBody extends TransactionBase {
    comment: string;
  }
}