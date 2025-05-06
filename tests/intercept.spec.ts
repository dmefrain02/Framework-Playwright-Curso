import {test,expect} from '@playwright/test'
import { LoginPage } from './pagesobjects/SauceDemo/LoginPage';
import { HomePage } from './pagesobjects/SauceDemo/HomePage';
import { ShoppingCarPage } from './pagesobjects/SauceDemo/ShoppingCarPage';
import { CheckoutPage } from './pagesobjects/SauceDemo/CheckoutPage';
import { BuyFinishPage } from './pagesobjects/SauceDemo/BuyFinishPage';
import { PageObjectBase } from './pagesobjects/PageObjectBase';

test('Hacer login',async({page},testInfo)=>{

    const PagObjBas = new PageObjectBase(page)
    
    //Login en el sitio de la prueba
    const Ingreso = new LoginPage(page)
    Ingreso.navigate()

    //Abortar recursos por separado y especificos
    /*await page.route(
        "https://www.saucedemo.com/v1/img/sauce-backpack-1200x1500.jpg",
        (route) => route.abort()
    );
    await page.route(
        "https://www.saucedemo.com/v1/img/bike-light-1200x1500.jpg",
        (route) => route.abort()
    );*/


    //Abortar recursos por expresion regular
    await page.route(
        "**/*.{jpg,png,jpeg,svg}",
        (route) => route.abort()
    );

    //Imprimir request de los recursos
    await page.on("request",req =>{
        console.log(req.url())
    });

    await PagObjBas.screenshot("Screenshots/","login.png")
    PagObjBas.attachment_screenshot_report(testInfo,"Login","image/png")

    await Ingreso.LoginWithCredentials()
    PagObjBas.screenshot("Screenshots","Captura.png")

    await PagObjBas.screenshot("Screenshots/","home.png")
    PagObjBas.attachment_screenshot_report(testInfo,"Home","image/png")

    //Validacion del Login
    await Ingreso.checkSuccessLogin()
    PagObjBas.attachment_screenshot_report(testInfo,"CheckLogin","image/png")

    //await page.pause()
});

test('Interceptor Test',async({page},testInfo)=>{

    const PagObjBas = new PageObjectBase(page)

    //Modificar recursos en los llamados
    await page.route(
        "https://demoqa.com/BookStore/v1/Books",
        (route) => route.fulfill({
            status: 304,
            headers: {
                'Content-Type':'application/json'
            },
            body:`
                {
                    "books": [
                        {
                            "isbn": "9781449325862",
                            "title": "Mi Libro de Ejemplo",
                            "subTitle": "A Working Introduction",
                            "author": "Richard E. Silverman",
                            "publish_date": "2020-06-04T08:48:39.000Z",
                            "publisher": "O'Reilly Media",
                            "pages": 500,
                            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                        }
                    ]
                }
            `
            })
    );
    await page.goto("https://demoqa.com/books")
    await page.pause()
    await PagObjBas.screenshot("Screenshots/","book.png")
    PagObjBas.attachment_screenshot_report(testInfo,"Book","image/png")
});