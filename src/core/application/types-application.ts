export interface Info {
    user: User;
    ownerInfo: OwnerInfo;
    tariff: Tariff;
}

interface User {
    id: string;
    name: string;
    access_mask: string;
    email: string;
}

interface OwnerInfo {
    email: string;
    phone: string;
    city: string;
    country: string;
    name: string;
    company_name: string;
}

interface Tariff {
    price: number;
    date_trial: number;
    currency_iso_code: string;
    next_pay_date: string;
    tariff_id: number;
    key: string;
    name: string;
}
