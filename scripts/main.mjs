import fs from 'fs';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
const url = "https://chriskgbc.github.io/desn3035-e5-rehearsal/";
await page.goto(url);
await page.setViewport({width: 1080, height: 1024});
await page.waitForNetworkIdle();

await page.screenshot({
  path: 'auto_screenshot.png',
});

const options = {output: 'html'};
const runnerResult = await lighthouse(url, options, undefined, page);
const reportHtml = runnerResult.report;
fs.writeFileSync('auto_report.html', reportHtml);

await browser.close();