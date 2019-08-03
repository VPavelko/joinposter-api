import * as request from 'request-promise';
import { MenuApiRoute } from './menu/menu';

export class Poster {
    menu: MenuApiRoute;
    constructor(protected readonly token: string) {
        this.menu = new MenuApiRoute(token);
    }
}

const poster = new Poster('token');

