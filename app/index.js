const puppeteer = require("puppeteer");
const fs = require("fs");
const robot = require("robotjs");

Screenshot("https://www.vsynctester.com/testing/mouse.html");

async function Screenshot(url) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.goto(url, {
    timeout: 0,
    waitUntil: "networkidle0",
  });

  await robot.setMouseDelay(2);

  var twoPI = Math.PI * 2.0;
  var screenSize = await robot.getScreenSize();
  var height = screenSize.height / 2 - 10;
  var width = screenSize.width;

  for (var x = 0; x < width; x++) {
    y = height * Math.sin((twoPI * x) / width) + height;
    await robot.moveMouse(x, y);
  }

  const screenData = await page.screenshot({
    encoding: "binary",
    type: "jpeg",
    quality: 30,
  });
  fs.writeFileSync("/data/screenshot.jpg", screenData);

  await page.close();
  await browser.close();
}
