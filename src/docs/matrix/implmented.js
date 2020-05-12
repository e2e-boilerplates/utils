import { readFileSync } from "fs";
import { logger, rootDir, frameworks } from "../../constants";
import { write } from "../../exec";

frameworks.push("selenium-webdriver");

export default function implementedList() {
  const content = {};
  const path = `${rootDir}/docs/README.md`;
  // keeping this for few months until the new path is taking over
  // TODO delete in future
  const old_path = `${rootDir}/utils/docs/implemented.md`;

  frameworks.sort().forEach((framework) => {
    content[framework] = readFileSync(`${rootDir}/docs/matrix/${framework}/implemented.md`, "utf8");
  });

  const data = `# JavaScript end-to-end Test Automation Boilerplate
  
The complete list of implemented JavaScript end-to-end test automation boilerplate.
  
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
  
## TestCafé
${content.testcafe}
  
## WD
${content.wd}
  
## WebdriverIO
${content.webdriverio}
`;

  try {
    write(path, data, "utf8");
    write(old_path, data, "utf8");
  } catch (error) {
    logger.error(`${__filename}: ${error}`);
  }
}
