import table from "markdown-table";
import { readdirSync, readFileSync } from "fs";
import { actionsStatusHome } from "../../src/docs/matrix/common";
import { logger, rootDir } from "../../src/constants";
import { write } from "../../src/exec";
import { bubbleSort } from "../../src/common";

function getData(file) {
  const data = readFileSync(`${rootDir}/docs/traffic/data/referrers/${file}`);
  return JSON.parse(data);
}

function getCount(stat) {
  let count = 0;
  stat.forEach((c) => {
    count += c.count;
  });
  return count;
}

function getUniques(temp) {
  let count = 0;
  temp.forEach((t) => {
    count += t.uniques;
  });
  return count;
}

/**
 * generate a markdown with referrers data
 * require the data first to gathered
 */
function getReferrers(stat) {
  const refs = [];
  stat.sort();
  stat.forEach((ref) => {
    refs.push(ref.referrer);
  });
  return refs.join(", ");
}

function writteReferrersDoc() {
  const files = readdirSync(`${rootDir}/docs/traffic/data/referrers/`);
  const stat = [];

  files.forEach((file) => {
    const row = [];
    const data = getData(file);

    row.push(getCount(data));
    row.push(getUniques(data));
    row.push(getReferrers(data));
    const lastIndex = file.lastIndexOf(".");
    const name = file.substring(0, lastIndex);
    row.push(actionsStatusHome(name));

    stat.push(row);
  });

  const content = bubbleSort(stat);
  content.unshift(["count", "unique", "referrers", "repository"]);

  try {
    write(`${rootDir}/docs/traffic/referrers.md`, table(content, { align: "l" }), "utf8");
  } catch (error) {
    logger.error(`${__filename}: Referrers doc: ${error}`);
  }
}

export default writteReferrersDoc;
