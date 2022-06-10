import { escape } from "../decorators/escape.js"
import { View } from "./view.js"

export class MensagemView extends View<string> {

    @escape
    protected template(dado: string): string {
        return `
            <p class="alert alert-info">${dado}</p>
        `
    }
}