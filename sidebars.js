const { readdirSync, readFileSync } = require("fs");
const { resolve, relative, dirname } = require("path");
const DocUtils = require("@docusaurus/utils");

const docsPath = resolve(__dirname, "docs");

function getFiles(dir) {
  const dirents = readdirSync(dir, { withFileTypes: true });

  const files = dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      return {
        type: "category",
        label: dirent.name,
        items: getFiles(res),
      };
    } else {
      const fileString = readFileSync(res, "utf-8");
      const { frontMatter } = DocUtils.parse(fileString);
      const relativePath = dirname(relative(docsPath, res));
      return {
        type: "doc",
        id:
          relativePath === "."
            ? frontMatter.id
            : relativePath + "/" + frontMatter.id,
      };
    }
  });

  return Array.prototype.concat(...files).sort((a, b) => {
    if (a.type === 'category' && b.type === 'doc') {
      return 1;
    } else if (a.type === 'doc' && b.type === 'category') {
      return -1;
    } else {
      return 0;
    }
  });
}

console.log(JSON.stringify(getFiles(docsPath), null, 2));

module.exports = {
  docs: getFiles(docsPath),
}