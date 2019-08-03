import * as request from 'request-promise';
import { Menu } from './menu/menu';

export class Poster {
    menu: Menu;
    constructor(protected readonly token: string) {
        this.menu = new Menu(token);
    }
}

const poster = new Poster('token');

