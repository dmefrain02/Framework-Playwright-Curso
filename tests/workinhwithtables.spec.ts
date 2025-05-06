import { test, expect } from '@playwright/test';
import { WorkingWithTables } from './pagesobjects/Cosmocode/workingwithtable';
import { PageObjectBase } from './pagesobjects/PageObjectBase';

test('primer_test',async({page},testInfo)=>{
    const PagObjBas = new PageObjectBase(page)
    
    const tabla = new WorkingWithTables(page)
    await tabla.navigate()
    PagObjBas.attachment_screenshot_report(testInfo,"Login","image/png")
    
    const countries = await tabla.obtenerfilastabla()
    const paisesxidioma = tabla.aplicarfiltroLenguaje(countries,'Spanish')
    const paisesxmoneda = tabla.aplicarfiltroMoneda(countries,'Colon')
});
