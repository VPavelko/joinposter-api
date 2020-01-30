import { Menu } from "./menu/menu";
import { Access } from "./access";

export class Poster {
    menu: Menu;
    access: Access;
    constructor(protected readonly token: string) {
        this.menu = new Menu(token);
        this.access = new Access(token);
    }
}
