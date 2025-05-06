import { expect, Locator, Page } from "@playwright/test"

export class HomePage{

    private contador_items : number
    private expect_item_name : string
    private expect_item_desc : string
    private expect_item_price : string
    private items_products : string
    private readonly AddToCar : Locator
    private readonly Shopping_Car: Locator

    constructor(page: Page){
        
        this.expect_item_name = ".inventory_item_name"
        this.expect_item_desc = ".inventory_item_desc"
        this.expect_item_price = ".inventory_item_price"
        this.items_products = ".inventory_container .inventory_list .inventory_item"
        this.AddToCar = page.getByRole("button",{name:"ADD TO CART"})
        this.Shopping_Car = page.locator("a.shopping_cart_link")
    }

    async obtener_productos(page: Page){
        const items_container = await page.locator(this.items_products).all()
        this.contador_items = items_container.length
        console.log(this.contador_items)
        return items_container
    }
    async calcRandomIndex(){
        const randomIndex = Math.floor(Math.random() * this.contador_items)
        console.log(randomIndex)
        return randomIndex 
    }
    async obtenervaloresperado_item_name(LocatorBase: Locator){
        const elemento = await LocatorBase.locator(this.expect_item_name).innerText()
        console.log('Nombre:', elemento)
        return elemento
    }
    async obtenervaloresperado_item_desc(LocatorBase: Locator){
        const elemento = await LocatorBase.locator(this.expect_item_desc).innerText()
        console.log('Descripcion:', elemento)
        return elemento
    }
    async obtenervaloresperado_item_price(LocatorBase: Locator){
        const elemento = await LocatorBase.locator(this.expect_item_price).innerText()
        console.log('Precio:', elemento)
        return elemento
    }

    async click_add_to_car(LocatorBase: Locator){
        await LocatorBase.locator(this.AddToCar).click()
    }
    async go_to_shopping_cart(){
        await this.Shopping_Car.click()
    }
}