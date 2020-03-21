import { readFileSync } from "fs";
import { logger, rootDir, frameworks } from "../constants";
import { write } from "../exec";

frameworks.push("selenium-webdriver");

async function implementedList() {
  const content = {};
  const path = `${rootDir}/utils/docs/implemented.md`;

  frameworks.sort().forEach(framework => {
    content[framework] = readFileSync(`${rootDir}/utils/docs/${framework}/implemented.md`, "utf8");
  });

  const data = `
  # Implemented
  
  ## Cypress
  ${content.cypress}
  
  ## Nightwatch
  ${content.nightwatch}
  
  ## Playwright
  ${content.playwright}
  
  ## Protractor
  ${content.protractor}
  
  ## Puppeteer
  ${content.puppeteer}
  
  ## Selenium Webdriver
  ${content["selenium-webdriver"]}
  
  ## WD
  ${content.wd}
  
  ## WebdriverIO
  ${content.webdriverio}
  `;

  try {
    await write(path, data, "utf8");
  } catch (error) {
    logger.error(error);
  }
}

// eslint-disable-next-line no-unused-vars
implementedList().then(r => {});