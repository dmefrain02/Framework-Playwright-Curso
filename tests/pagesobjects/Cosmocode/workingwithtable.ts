import { expect, Locator, Page } from "@playwright/test"

export class WorkingWithTables{
    private TableContainer : Locator
    private readonly url : string
    private readonly page: Page

    constructor(page:Page){
        this.page = page
        this.url = process.env.URL1
        this.TableContainer = page.locator("//table[@id='countries']")
    }

    async navigate(){
        console.log('URL cargada:', this.url);
        await this.page.goto(this.url)
    }
    
    async obtenerfilastabla(){
        const rows = await this.TableContainer.locator("xpath=.//tr").all()
        console.log('Cant. Paises:', rows.length)
        
        //Carga de datos de la tabla en la interfaz
        const countries:Country[] = []
        for (let row of rows){
            let country : Country={
                Country: await row.locator('xpath=.//td[2]').innerText(),
                Capital: await row.locator('xpath=.//td[3]').innerText(),
                Currency: await row.locator('xpath=.//td[4]').innerText(),
                PrimaryLang: await row.locator('xpath=.//td[5]').innerText()
            }
            countries.push(country)
        }
        console.log(countries)
        return countries
    }

    async aplicarfiltroLenguaje(countries:Country[], idioma:string){

        const PaisesListadosPorIdioma = countries.filter(country => country.PrimaryLang === idioma)
        console.log('Cant. de Paises por Idioma: ', PaisesListadosPorIdioma.length)
        console.log('Paises por Idioma: ', PaisesListadosPorIdioma)
        return PaisesListadosPorIdioma
    }

    async aplicarfiltroMoneda(countries:Country[], moneda:string){

        const PaisesListadosPorMoneda = countries.filter(country =>country.Currency === moneda)
        console.log('Cant. de Paises por Moneda: ', PaisesListadosPorMoneda.length)
        console.log('Paises por Moneda: ', PaisesListadosPorMoneda)
        return PaisesListadosPorMoneda
    }

}

//Interfaz para manejar los datos
interface Country{
    Country : string,
    Capital : string,
    Currency: string,
    PrimaryLang: string
}

/*
//table[@id='countries']//tr[2]//td[1]
//table[@id='countries']
.tr -> filas
.td -> datos de las celdas

//table[@id='countries']//tr[2]//td[1] Check
//table[@id='countries']//tr[2]//td[2] Country
//table[@id='countries']//tr[2]//td[3] Capital
//table[@id='countries']//tr[2]//td[4] Currency
//table[@id='countries']//tr[2]//td[5] Primary Languaje
*/