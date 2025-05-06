import { expect, Locator, Page } from "@playwright/test"

export class CheckoutPage{

    private readonly FirstName : Locator
    private readonly LastName : Locator
    private readonly PostCode : Locator
    private readonly Continuar : Locator
    private readonly Finish : Locator

    constructor(page : Page){
        this.FirstName = page.getByRole("textbox",{name:"First Name"})
        this.LastName  = page.getByRole("textbox",{name:"Last Name"})
        this.PostCode  = page.getByRole("textbox",{name:"Zip/Postal Code"})
        this.Continuar = page.locator("input.cart_button")
        this.Finish    = page.getByRole("link",{name:"FINISH"})
    }

    async checksucesscheckout(){
        await expect(this.Continuar).toBeVisible()
    }

    async checksucesscheckout_finish(){
        await expect(this.Finish).toBeVisible()
    }
    
    async fillFirsname(firstname: string){
        await this.FirstName.fill(firstname)
    }

    async fillLastname(lastname: string){
        await this.LastName.fill(lastname)
    }

    async fillPostalCode(PostalCode: string){
        await this.PostCode.fill(PostalCode)
    }

    async click_continuar(){
        await this.Continuar.click();
    }

    async click_finish(){
        await this.Finish.click()
    }
}