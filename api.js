const fs = require("fs");
const path = require("path");

const directoryPath = process.argv[2];
const outputFile = process.argv[3];

const searchTerms = [
  "this.create(",
  "this.update(",
  "this.fetch(",
  "this.patch(",
  "this.remove(",
  "request(",
  "this.create<",
  "this.update<",
  "this.fetch<",
  "this.patch<",
  "this.remove<",
  "request<",
];

function searchFileForFunctions(filePath, functionNameRegex) {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const functionsFound = [];
  let rootPath = "";
  let mergeLine = "";

  lines.forEach((line, index) => {
    if (mergeLine && searchTerms.some((t) => mergeLine.includes(t))) {
      line = mergeLine + line.trim();
      mergeLine = "";
    }

    if (!(line.endsWith(";") || line.endsWith(")"))) {
      mergeLine = line;
      return;
    }

    if (line.match(functionNameRegex)) {
      functionsFound.push({ line: index + 1, text: line.replace("return", "").trim() });
    }

    if (line.match(new RegExp("super\\("))) {
      rootPath = line.trim();
    }

    if (
      mergeLine &&
      searchTerms.some((t) => mergeLine.includes(t)) &&
      !functionNameRegex.match(mergeLine)
    ) {
      mergeLine = "";
    }
  });

  return { functionsFound, rootPath };
}

function searchDirectory(directoryPath, functionNameRegex) {
  let results = [];

  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);

    if (
      !filePath.includes("node_modules") &&
      !["request.js", "request.ts", "http-request.js", "http-request.ts"].includes(file)
    ) {
      if (fs.statSync(filePath).isDirectory()) {
        results = results.concat(searchDirectory(filePath, functionNameRegex));
      } else {
        const extension = path.extname(filePath).toLowerCase();
        if (
          extension === ".js" ||
          extension === ".jsx" ||
          extension === ".ts" ||
          extension === ".tsx"
        ) {
          const { functionsFound, rootPath } = searchFileForFunctions(filePath, functionNameRegex);
          if (functionsFound.length) {
            results.push({ filePath, rootPath, functionsFound });
          }
        }
      }
    }
  });

  return results;
}

const results = searchDirectory(
  directoryPath,
  new RegExp("(this\\.create|this\\.update|this\\.fetch|this\\.patch|this\\.remove|request)(<|\\()")
);
fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
