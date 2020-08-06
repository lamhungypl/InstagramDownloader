// import { getProductImage } from "./helper";
const getProductImage = require("./helper").getProductImage;

async function main() {
    const productUrl =
        "https://www.amazon.com/Disney-Stitchs-Fresh-Catch-T-Shirt/dp/B07K11YZYZ/ref=sr_1_1?dchild=1&keywords=sushi&m=ATVPDKIKX0DER&qid=1595751459&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-1";

    const imgUrl = await getProductImage(productUrl);
    console.log({ imgUrl });
}
main();
