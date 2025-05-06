import { expect, Locator, Page } from "@playwright/test"

export class ShoppingCarPage{

    private readonly Checkout : Locator
    private actual_item_name : string
    private actual_item_desc : string
    private actual_item_price : string

    constructor(page : Page){

        this.Checkout = page.getByRole("link",{name:"CHECKOUT"})
        this.actual_item_name = ".inventory_item_name"
        this.actual_item_desc = ".inventory_item_desc"
        this.actual_item_price = ".inventory_item_price"
    }

    async checkSucessShoppingCar(){
        await expect(this.Checkout).toBeVisible()
    }
    async checkvaloresactuales_esperados(valor_actual: string, valor_esperado:string){
        await expect(valor_actual).toEqual(valor_esperado)
    }

    async obtenervaloractual_item_name(page: Page){
        const elemento = await page.locator(this.actual_item_name).innerText()
        console.log('Nombre:', elemento)
        return elemento
    }
    async obtenervaloractual_item_desc(page: Page){
        const elemento = await page.locator(this.actual_item_desc).innerText()
        console.log('Descripcion:', elemento)
        return elemento
    }
    async obtenervaloractual_item_price(page: Page){
        const elemento = await page.locator(this.actual_item_price).innerText()
        console.log('Precio:', elemento)
        return elemento
    }
    async go_to_checkout(){
        await this.Checkout.click()
    }
}