import { readdirSync, writeFileSync } from "fs";
import { logger, reposDir, miscRepos, rootDir } from "./common/constants";

function reposArray() {
  const list = [];
  const path = `${rootDir}/docs/repos.json`;

  try {
    const files = readdirSync(reposDir);

    for (let i = 1; i < files.length; i += 1) {
      const repos = require(`../repos/repo-${i}.json`);
      repos.forEach((repo) => {
        const { name } = repo;
        if (!miscRepos.includes(name)) {
          list.push(name);
        }
      });
    }
  } catch (error) {
    logger.error(`${__filename}: ${error}`);
  }

  const data = JSON.stringify(list, null, 2);
  writeFileSync(path, data, "utf8");
  writeFileSync("./api/v1/repositories.json", data, "utf8");
  writeFileSync(`${rootDir}/api/api/v1/repositories/index.json`, data);
}

export default reposArray;
