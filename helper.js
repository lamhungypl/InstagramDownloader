const puppeteer = require("puppeteer");
//for download
// const fs = require("fs");
// const downloader = require("image-downloader");

// function getLargestImagesFromSrcSet(srcSet) {
//     const splitedSrcs = srcSet.split(",");
//     const imgSrc = splitedSrcs[splitedSrcs.length - 1].split(" ")[0];
//     return imgSrc;
// }

async function getImageUrlsFromPage(url) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        await page.goto(url);
        console.log({ url });

        const imageSrcSets = await page.evaluate(() => {
            //layout may change
            const imgs = Array.from(document.querySelectorAll("img.a-dynamic-image"));

            //larger image
            return imgs[0].getAttribute("data-old-hires");

            //small image
            return imgs[0].getAttribute("src");
        });

        await browser.close();
        // return imgUrls;
        return imageSrcSets;
    } catch (error) {
        return error;
        throw new Error("error when browse url", error);
    }
}
async function getProductImage(productUrl) {
    const images = await getImageUrlsFromPage(productUrl);
    return images;

    // for download image
    // const resultFolder = "./result";
    // if (!fs.existsSync(resultFolder)) {
    //     fs.mkdirSync(resultFolder);
    // }
    // downloader.image({
    //     url: images,
    //     dest: resultFolder
    // });
}
module.exports = { getProductImage };
