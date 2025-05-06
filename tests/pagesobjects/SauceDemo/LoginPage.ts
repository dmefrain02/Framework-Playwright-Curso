import { expect, Locator, Page, TestInfo } from "@playwright/test"

export class LoginPage{
        
        private readonly url: string
        private readonly username: Locator
        private readonly Password: Locator
        private readonly LoginBtn : Locator
        private readonly shoppingCarIcon: Locator
        private readonly user: string
        private readonly pass: string
        private readonly page: Page

        constructor(page: Page){
            this.page = page
            this.url = process.env.URL
            this.user = process.env.user
            this.pass = process.env.pass
            this.username = page.getByRole("textbox",{name:"Username"})
            this.Password = page.getByPlaceholder("Password")
            this.LoginBtn = page.getByRole("button",{name:"LOGIN"})
            this.shoppingCarIcon = page.locator("a.shopping_cart_link")
        }

        async navigate(){
            console.log('URL cargada:', this.url);
            await this.page.goto(this.url)
        }

        async checkSuccessLogin(){
            await expect(this.shoppingCarIcon).toBeVisible()
        }

        async fillUsername(username: string){
            await this.username.fill(username)
        }

        async fillPass(pass: string){
            await this.Password.fill(pass)
        }

        async clickLoginBtn(){
            await this.LoginBtn.click()
        }

        async LoginWithCredentials(){
            await this.fillUsername(this.user)
            await this.fillPass(this.pass)
            await this.clickLoginBtn()
        }
}