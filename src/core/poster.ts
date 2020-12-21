import { Transactions, TransactionsTypes } from "./transactions";
import { Menu, MenuTypes } from "./menu";
import { Access, AccessTypes } from "./access";
import { Settings, SettingsTypes } from "./settings";
import { Dash, DashTypes } from "./dash";
import { Finance, FinanceTypes } from "./finance";
import { IncomingOrders, IncomingOrdersTypes } from "./incomingOrders";
import { PosterOptions } from "./base";
import { Clients, ClientsTypes } from "./clients";
import { Application, ApplicationTypes } from "./application";

export class Poster {
    menu: Menu;
    access: Access;
    settings: Settings;
    dash: Dash;
    transactions: Transactions;
    incomingOrders: IncomingOrders;
    clients: Clients;
    finance: Finance;
    application: Application;

    constructor(protected readonly token: string, options?: PosterOptions) {
        this.menu = new Menu(token, options);
        this.access = new Access(token, options);
        this.settings = new Settings(token, options);
        this.dash = new Dash(token, options);
        this.transactions = new Transactions(token, options);
        this.clients = new Clients(token, options);
        this.incomingOrders = new IncomingOrders(token, options);
        this.finance = new Finance(token, options);
        this.application = new Application(token, options);
    }
}

export {
    MenuTypes as Menu,
    AccessTypes as Access,
    SettingsTypes as Settings,
    DashTypes as Dash,
    TransactionsTypes as Transaction,
    ClientsTypes as Clients,
    IncomingOrdersTypes as IncomingOrders,
    FinanceTypes as Finance,
    ApplicationTypes as Application,
};
