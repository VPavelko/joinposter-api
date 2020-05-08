export type ClientID = number;

export interface ClientListItem {
    //!	Id клиента
    client_id: string; 
    firstname: string; //!	Имя клиента
    lastname: string; //! 	Фамилия клиента
    patronymic: string; //!	Отчество клиента
    discount_per: string; //!	Персональный процент скидки или бонусов. Будет использоваться, если больше, чем процент группы клиента.
    bonus: string; //!	Текущий размер накопленных бонусов клиента в копейках
    total_payed_sum: string; //!	Общая сумма покупок в копейках
    date_activale: string; //!	Дата создания клиента
    phone: string; //!	Телефон клиента
    phone_number: string; //!	Телефон клиента в формате цифр
    email: string; //!	Адрес электронной почты клиента
    birthday: string; //!	Дата рождения клиента
    card_number: string; //!	Номер карты
    client_sex: string; //!	Пол клиента: 0 — не указан, 1 — мужской, 2 — женский
    country: string; //!	Страна клиента
    city: string; //!	Город клиента
    address: string; //!	Адрес клиента
    comment: string; //!	Комментарий к учетной записи клиента
    id_1c: string; //!	Id клиента в системе 1С
    client_groups_id: string; //!	Id группы клиента
    client_groups_name: string; //!	Название группы клиента
    loyalty_type: string; //!	Тип группы клиента: 1 — бонусная, 2 — скидочная
    client_groups_discount: string; //!	Процент группы. Если группа бонусная — 1, то будет начислять бонусы на оплаченную сумму заказа. Если группа скидочная — 1, то будет давать процент скидки на сумму заказа.
    birthday_bonus: string; //!	Количество бонусов в копейках начисляемые в день рождения клиента. Используется только бонусными группами.
    delete: string; //!	Удален: 0 — нет, 1 — да
    ewallet: string; //!	Баланс депозита в копейках
}

export interface Client extends Omit<ClientListItem, "delete"> {
    //! Список продаж, что относятся к акциям с накоплением. Например, акция «5+1», где учитываются покупки в разных чеках.
    accumulation_products: {
        [promotion_id: string]: {
            promotion_id: string; //!	Id акции с накоплением, за которой закрепили данную продажу
            //!	Список товаров осуществленной продажи, что относится к акции с накоплением. Ниже описано содержимое данного массива товаров.
            products: {
                product_id: string; //!	Id товара
                modification_id: string; //!	Id модификации, если товар с модификациями
                count: string; //!	Количество товара
                sum: number; //!	Стоимость товара
            }[];
        };
    };
    //! 	Список отложенных бонусов, что относятся к призовым акциям. Например, акция «Купи пиццу и получи завтра еще одну на 10% дешевле», то есть призы, которые выдаются не сразу, а откладываются на следующую покупку.
    prize_products: {
        prize_product_id: string; //!	Уникальный id отложенного приза
        promotion_id: string; //!	id призовой акции
        date_accrual: string;
        //!	Список условий, по которым определяется какой именно приз надо выдать. type обозначет: 0 — из всех товаров, 1 — из категории, что указана в id, 2 — конкретный товар с указанным id, 3 — модификация товара с указанным id (для удобства еще будет передан product_id товара, к которому относится модификация)
        conditions: {
            bonus_products: { type: string; id: string }[];
            bonus_products_pcs: number; //!	Сколь штук бонусного товара выдавать, если он штучный
            bonus_products_g: number; //!	Сколь грамм бонусного товара выдавать, если он весовой
            bonus_products_condition_type: string; //!	На каких условиях выдавать бонус: 1 — процент скидки (например, с 50 или 100% скидкой), 2 — фиксированная сумма скидки (например, дать 5 гривен/рублей скидки на товар), 3 — фиксированная стоимость товара (например, продавать по 1 гривне/рублю)
            bonus_products_condition_value: string; //!	Количество для параметра bonus_products_condition_type. Если денежное значение, то возвращается в гривнах/рублях.
        };
    }[];
}

export interface GetClientsQuery {
    num?: number; //!	Количество клиентов, которое необходимо получить. По умолчанию не передаётся.
    offset?: number; //!	Количество клиентов, которое необходимо пропустить от начала. По умолчанию не передаётся.
    group_id?: string; //!	Id группы клиентов. По умолчанию не передаётся.
    phone?: string; //!	Номер телефона клиента в международном формате. По умолчанию не передаётся.
    birthday?: string; //!	Дата дня рождения клиентов, формат "md". По умолчанию не передаётся.
    client_id_only?: true; //!	Опциональный параметр, позволяет возвращать только client_id клиентов. В качестве значения необходимо указать true.
    "1c"?: true; //!	Позволяет вернуть в ответе id клиента в системе 1С. В качестве значения необходимо передать true. По умолчанию не передаётся.
    order_by?: string; //!	Поле, по которому происходит сортировка. По умолчанию принимает client_id.
    sort?: "asc" | "desc"; //!	Порядок сортировки: asc — по возрастанию, desc — по убыванию. По умолчанию принимает desc.
}

export interface GetClientQuery {
    "1c"?: true; //! Позволяет вернуть в ответе id клиента в системе 1С. В качестве значения необходимо передать true. По умолчанию не передаётся.
    client_id: string;
}

export interface CreateClientBody {
    client_name: string; //!	ФИО клиента
    client_sex?: ClientGender; //!	Пол клиента: 0 — не указан, 1 — мужской, 2 — женский
    client_groups_id_client?: number; //!	Id группы клиентов
    card_number?: string; //!	Номер карты клиента
    discount_per?: number; //!	Персональный процент скидки или бонсов. Будет использоваться, если больше, чем процент группы клиента.
    phone: string; //!	Телефон клиента, уникальный, в системе не может быть два клиента с одинаковым номером
    email?: string; //!	Адрес электронной почты клиента
    birthday?: string; //!	Дата рождения клиента, формат "Y-m-d"
    city?: string; //!	Город клиента
    country?: string; //!	Страна клиента
    address?: string; //!	Адрес клиента
    comment?: string; //!	Комментарий к учетной записи клиента
    bonus?: number; //!	Текущий размер накопленных бонусов клиента
    total_payed_sum?: number; //!	Общая сумма покупок в копейках
}

export type UpdateClientBody = Partial<CreateClientBody> & {
    client_id: ClientID;
};

export interface RemoveClientBody {
    client_id: ClientID;
}

export interface RemoveClientsBody {
    ids: ClientID[];
}

export enum ClientGender {
    UNDEFINED = 0,
    MALE,
    FEMALE,
}
