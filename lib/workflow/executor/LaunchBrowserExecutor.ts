import { waitFor } from "@/lib/helper/waitFor";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

const BROWSER_WS =
  "wss://brd-customer-hl_cfb85892-zone-scrape_flow_browser:mws315qzosbo@brd.superproxy.io:9222";
("");

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSER_WS,
    });
    environment.log.info("Browser started successfully");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 });
    await page.authenticate({
      username: "brd-customer-hl_cfb85892-zone-scrape_flow",
      password: "8hu58xtfea0k",
    });
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
