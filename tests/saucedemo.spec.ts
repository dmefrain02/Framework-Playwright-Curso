import {test,expect} from '@playwright/test'
import { LoginPage } from './pagesobjects/SauceDemo/LoginPage';
import { HomePage } from './pagesobjects/SauceDemo/HomePage';
import { ShoppingCarPage } from './pagesobjects/SauceDemo/ShoppingCarPage';
import { CheckoutPage } from './pagesobjects/SauceDemo/CheckoutPage';
import { BuyFinishPage } from './pagesobjects/SauceDemo/BuyFinishPage';
import { PageObjectBase } from './pagesobjects/PageObjectBase';

test('Comprar un item',async({page},testInfo)=>{

    const PagObjBas = new PageObjectBase(page)

    //Login en el sitio de la prueba
    const Ingreso = new LoginPage(page)
    Ingreso.navigate()
    await PagObjBas.screenshot("Screenshots/","login.png")
    PagObjBas.attachment_screenshot_report(testInfo,"Login","image/png")

    await Ingreso.LoginWithCredentials()
    await PagObjBas.screenshot("Screenshots/","home.png")
    PagObjBas.attachment_screenshot_report(testInfo,"Home","image/png")

    //Validacion del Login
    await Ingreso.checkSuccessLogin()
    PagObjBas.attachment_screenshot_report(testInfo,"CheckLogin","image/png")

    //Ir al sitio de la prueba.
    const Home = new HomePage(page)
    //Seleccion de elementos en la pagina
    const items_container = await Home.obtener_productos(page)

    //calculo del item a clickear de manera aleatoria
    const randomIndex = await Home.calcRandomIndex()
    const randomItem = items_container[randomIndex]

    //Obtener elemento seleccionado para trabajar
    const expectName = await Home.obtenervaloresperado_item_name(randomItem)
    const expectDescription = await Home.obtenervaloresperado_item_desc(randomItem)
    const expectPrice = await Home.obtenervaloresperado_item_price(randomItem)

    //Agregar elemento al carrito e ir al carrito
    await Home.click_add_to_car(randomItem)
    await Home.go_to_shopping_cart()

    const ShoppingCar = new ShoppingCarPage(page)
    await ShoppingCar.checkSucessShoppingCar()
    
    //Obtener valores actuales en el carrito
    const actualName = await ShoppingCar.obtenervaloractual_item_name(page)
    const actualDesc = await ShoppingCar.obtenervaloractual_item_desc(page)
    const actualPrice = await ShoppingCar.obtenervaloractual_item_price(page)
    
    //Validaciones de datos
    await ShoppingCar.checkvaloresactuales_esperados(actualName,expectName)
    await ShoppingCar.checkvaloresactuales_esperados(actualDesc,expectDescription)
    await ShoppingCar.checkvaloresactuales_esperados('$'+ actualPrice,expectPrice)
    
    //Click en el boton checkout
    await ShoppingCar.go_to_checkout()

    //Validar pagina checkout
    const checkout = new CheckoutPage(page)
    await checkout.checksucesscheckout()

    //Ingresar datos
    await checkout.fillFirsname("ECD")
    await checkout.fillLastname("QWE")
    await checkout.fillPostalCode("12345")
    PagObjBas.attachment_screenshot_report(testInfo,"Checkout","image/png")

    //Continuar
    await checkout.click_continuar()

    //Validar pagina finalizar compra
    await checkout.checksucesscheckout_finish()

    //Finalizar compra
    await checkout.click_finish()
    PagObjBas.attachment_screenshot_report(testInfo,"Finish","image/png")

    const buyfinish = new BuyFinishPage(page)
    //Mensaje Visible
    await buyfinish.checksucess_message_esperado()

    //Validar mensajes
    await buyfinish.check_message_esperado()
    PagObjBas.attachment_screenshot_report(testInfo,"MensajeFinal","image/png")

    //await page.pause()
});