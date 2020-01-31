import { Menu } from "./menu/menu";
import { Access } from "./access";
import { Settings } from "./settings";

export class Poster {
    menu: Menu;
    access: Access;
    settings: Settings;
    constructor(protected readonly token: string) {
        this.menu = new Menu(token);
        this.access = new Access(token);
        this.settings = new Settings(token);
    }
}
