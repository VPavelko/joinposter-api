import { Transactions, TransactionsTypes } from './transactions';
import { Menu, MenuTypes } from './menu';
import { Access, AccessTypes } from './access';
import { Settings, SettingsTypes } from './settings';
import { Dash, DashTypes } from './dash';

export class Poster {
    menu: Menu;
    access: Access;
    settings: Settings;
    dash: Dash;
    transactions: Transactions;

    constructor(protected readonly token: string) {
        this.menu = new Menu(token);
        this.access = new Access(token);
        this.settings = new Settings(token);
        this.dash = new Dash(token);
        this.transactions = new Transactions(token);
    }
}

export {
    MenuTypes as Menu,
    AccessTypes as Access,
    SettingsTypes as Settings,
    DashTypes as Dash,
    TransactionsTypes as Transaction,
};
