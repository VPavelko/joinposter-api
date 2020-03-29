import { Transactions, TransactionsTypes } from './transactions';
import { Menu, MenuTypes } from './menu';
import { Access, AccessTypes } from './access';
import { Settings, SettingsTypes } from './settings';
import { Dash, DashTypes } from './dash';
import { PosterOptions } from './base';

export class Poster {
    menu: Menu;
    access: Access;
    settings: Settings;
    dash: Dash;
    transactions: Transactions;

    constructor(protected readonly token: string, options?: PosterOptions) {
        this.menu = new Menu(token, options);
        this.access = new Access(token, options);
        this.settings = new Settings(token, options);
        this.dash = new Dash(token), options;
        this.transactions = new Transactions(token, options);
    }
}

export {
    MenuTypes as Menu,
    AccessTypes as Access,
    SettingsTypes as Settings,
    DashTypes as Dash,
    TransactionsTypes as Transaction,
};
