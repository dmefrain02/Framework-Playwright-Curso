import { expect, Locator, Page } from "@playwright/test"

export class BuyFinishPage{

    private readonly mensaje_esperado : string
    private readonly mensaje_actual : Locator

    constructor(page: Page){
        this.mensaje_esperado = "THANK YOU FOR YOUR ORDER" 
        this.mensaje_actual = page.locator("h2.complete-header")
    }

    async checksucess_message_esperado(){
        await expect(this.mensaje_actual).toBeVisible()
    }

    async check_message_esperado(){
       const mensajeactual = await this.mensaje_actual.innerText()
       expect(mensajeactual).toEqual(this.mensaje_esperado)
    }
}