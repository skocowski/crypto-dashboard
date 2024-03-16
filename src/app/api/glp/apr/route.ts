import puppeteer from "puppeteer";

export async function GET(request: Request) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://app.gmx.io/#/earn");

    await page.waitForSelector(
      "#root > div > div.App > div > div > div.StakeV2-content > div > div.App-card.App-card-space-between > div:nth-child(1) > div.App-card-content > div:nth-child(5) > div:nth-child(2) > span > span"
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const grabAPR = await page.evaluate(() => {
      const aprTag = document.querySelector(
        "#root > div > div.App > div > div > div.StakeV2-content > div > div.App-card.App-card-space-between > div:nth-child(1) > div.App-card-content > div:nth-child(5) > div:nth-child(2) > span > span"
      );
      return aprTag ? aprTag.textContent : null; // Check if aprTag is null before accessing its textContent
    });

    await browser.close();

    if (grabAPR !== null) {
      return new Response(grabAPR);
    } else {
      return new Response("APR tag not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Error occurred", { status: 500 });
  }
}
