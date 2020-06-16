const GQL = require("graphql-request");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { resolve, relative, dirname, basename } = require("path");
const DocUtils = require("@docusaurus/utils");
const metadata = require("../metadata.json");

const guidesPath = resolve(__dirname, "../guides");

const authors = metadata.team.map((author) => author.id.toLowerCase());

const new_authors = [];

function checkGuidesForAuthors(dir) {
console.log('CHECKING: ', dir);
  const dirents = readdirSync(dir, { withFileTypes: true });

  for (dirent of dirents) {
    const res = resolve(dir, dirent.name);

    if (dirent.isDirectory()) {
        console.log('isDir');
      return checkGuidesForAuthors(res);
    } else {
      console.log('is NOT Dir');
      const fileString = readFileSync(res, "utf-8");
      const { frontMatter } = DocUtils.parse(fileString);
      const username = basename(frontMatter.author_github);

      console.log(username);

      if (
        !authors.includes(username.toLowerCase()) &&
        !new_authors.includes(username.toLowerCase())
      ) {
        new_authors.push(username.toLowerCase());
      }
    }
  }
  console.log('DONE TRAVERSING');
  return new_authors;
}

async function githubApi() {
  const endpoint = "https://api.github.com/graphql";

  const graphQLClient = new GQL.GraphQLClient(endpoint, {
    headers: {
      authorization: "bearer a6c72e4dfa90cfc877ed737656ca3b4779211f83",
    },
  });

  let query = "";

  for (let index = 0; index < new_authors.length; index++) {
    let string = `user_${index}: user(login:"${new_authors[index]}") {
        name,
        avatarUrl,
        bio,
        login,
        url,
    }`;

    query = query.concat(string);
  }
  query = "{" + query + "}";

  return await graphQLClient.request(query);
}

async function main() {
  let test = checkGuidesForAuthors(guidesPath);

  console.log(test);
  // let response = await githubApi();
  // let authors_formatted = Object.values(response).map(user => ({
  // avatar: user.avatarUrl,
  // bio: user.bio,
  // github: user.url,
  // id: user.login,
  // name: user.name
  // }));

  // metadata.team = metadata.team.concat(authors_formatted);

  // writeFileSync(resolve(__dirname, '../metadata.json'), JSON.stringify(metadata, undefined, 2));
}

main();
