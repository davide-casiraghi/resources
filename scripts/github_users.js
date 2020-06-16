const GQL = require("graphql-request");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const { resolve, relative, dirname, basename } = require("path");
const DocUtils = require("@docusaurus/utils");
const metadata = require("../metadata.json");

const guidesPath = resolve(__dirname, "../guides");
const authors = metadata.team.map((author) => author.id.toLowerCase());

const API_KEY = "ad224e87c5e34ebdae06456d9194c85adbc9562c";
const API_ENDPOINT = "https://api.github.com/graphql";

function checkGuidesForAuthors(dir, new_authors) {
  const dirents = readdirSync(dir, { withFileTypes: true });

  for (dirent of dirents) {
    const res = resolve(dir, dirent.name);

    if (dirent.isDirectory()) {
      checkGuidesForAuthors(res, new_authors);
    } else {
      const fileString = readFileSync(res, "utf-8");
      const { frontMatter } = DocUtils.parse(fileString);
      const username = basename(frontMatter.author_github);
      if (
        !authors.includes(username.toLowerCase()) &&
        !new_authors.includes(username.toLowerCase())
      ) {
        new_authors.push(username.toLowerCase());
      }
    }
  }
  return new_authors;
}

async function githubApi(usernames) {
  const graphQLClient = new GQL.GraphQLClient(API_ENDPOINT, {
    headers: {
      authorization: `bearer ${API_KEY}`,
    },
  });

  let query = "";

  for (let index = 0; index < usernames.length; index++) {
    let string = `user_${index}: user(login:"${usernames[index]}") {
        name,
        avatarUrl,
        bio,
        login,
        url,
    }`;

    query = query.concat(string);
  }
  query = `{ ${query}  }`;

  return await graphQLClient.request(query);
}

async function main() {
  let authors = checkGuidesForAuthors(guidesPath, []);

  if (!authors.length) {
    return;
  }

  let response;
  try {
    response = await githubApi(authors);
  } catch (error) {
    if (error.response && error.response.errors.length) {
      throw error.response.errors;
    }
    throw error;
  }

  let authors_formatted = Object.values(response).map((user) => ({
    avatar: user.avatarUrl,
    bio: user.bio,
    github: user.url,
    id: user.login,
    name: user.name,
  }));

  metadata.team = metadata.team.concat(authors_formatted);

  writeFileSync(
    resolve(__dirname, "../metadata.json"),
    JSON.stringify(metadata, undefined, 2)
  );
}

main().catch((error) => {
  console.error('### ERROR ###\n', error, '\n### END ERROR ###');
  process.exit(1);
});
