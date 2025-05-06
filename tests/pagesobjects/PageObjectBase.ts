import { expect, Locator, Page, TestInfo } from "@playwright/test"

export class PageObjectBase{

    private readonly page : Page

    constructor(page:Page){
        this.page = page
    }

    async screenshot(Carpeta: string, nameScreenshot:string){
        await this.page.screenshot({path: Carpeta+"/"+nameScreenshot})
    }

    async attachment_screenshot_report(testInfo: TestInfo, nameScreenshot:string, contentType:string){
        await testInfo.attach(nameScreenshot,{
            body: await this.page.screenshot(),
            contentType: contentType
        })

    }
}
        