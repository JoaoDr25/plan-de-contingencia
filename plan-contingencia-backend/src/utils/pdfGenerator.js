import puppeteer from 'puppeteer';
import fs from  "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

export const generarDocumentoPdf = async (plan) => {

    const rutaTemplate = path.join(
        _dirname,
        "../templates/planContingenciaTemplate.html"
    );

    const html = await fs.readFile(
        rutaTemplate,
        "utf8"
    );

    let htmlFinal = html;

    htmlFinal = htmlFinal.replace(
        "{{programa}}",
        plan.programaFormacionNombre
    )

    console.log(htmlFinal);

    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    page.setContent(htmlFinal);

    await page.setContent(htmlFinal, {
        waitUntil: "networkidle0"
    });

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true
    });

    await browser.close();

    return pdf;
}
