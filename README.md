<div align="center">
  <h1>NodeJs development setup with Typescript</h1>
  <p>Have a development setup ready when building your next API with Nodejs and Typescript. The structure has scripts, commit systems, swagger for documentation and much more!</p>
</div>

## 🚀 Features

#### Node.js

<img align="center" alt="nodejs" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"/>

#### This tool will give us the ability to interpret JavaScript code, in a very similar way to the browser. For more information, consult the <a href="https://nodejs.org/en">Official Documentation</a>

#

#### Typescript

<img align="center" alt="nodejs" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"/>

#### TypeScript supports features like autocompletion, more efficient code navigation, and inline documentation. This will significantly improve the development experience, allowing developers to work more productively and effectively. For more information, consult the <a href="https://www.typescriptlang.org/">Official Documentation</a>

#

#### Jest

<img align="center" alt="nodejs" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg"/>

#### Jest is a JavaScript testing framework designed to ensure the correctness of any JavaScript code. It lets you write tests with an accessible, familiar, and feature-rich API that gets you results quickly. For more information, consult the <a href="https://jestjs.io/">Official Documentation</a>

#

#### MongoDB

<img align="center" alt="nodejs" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"/>

#### MongoDB is a free, open source, cross-platform document-oriented database software. For more information, consult the <a href="https://www.mongodb.com/">Official Documentation</a>

#

#### Mongoose

<img align="center" alt="nodejs" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongoose/mongoose-original.svg"/>

#### Mongoose is a JavaScript object-oriented programming library that creates a connection between MongoDB and the Node.js JavaScript runtime environment. For more information, consult the <a href="https://mongoosejs.com/">Official Documentation</a>

#

#### Express.js

<img align="center" alt="nodejs" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg"/>

#### Express.js is a framework for Node.js that provides minimal resources for building web servers. For more information, consult the <a href="https://expressjs.com/">Official Documentation</a>

#

#### Eslint

<img align="center" alt="nodejs" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg"/>

#### ESLint is a linter, a static analysis tool, for the Javascript and Typescript languages, being the most popular in the world for such languages. For more information, consult the <a href="https://eslint.org/">Official Documentation</a>

#

#### Swagger

<img align="center" alt="nodejs" height="40" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/swagger/swagger-original.svg"/>

#### Swagger is used in API development to document and test API functionalities in a standardized way. For more information, consult the <a href="https://swagger.io/">Official Documentation</a>

> **Note**: This technology configuration can be adapted according to your needs
> Always check the most current and stable version of each technology
> From branch navigation you can use only part of the setup

## Prerequisites

#### GIT

#### The purpose of Git is to carry a record of changes and coordinate the work of multiple people in a shared repository. For more information and installation, see the <a href="https://git-scm.com/">Official Documentation</a>.

#### NPM

#### It is a library and registry for JavaScript software packages. npm also has command-line tools to help you install the different packages and manage their dependencies. For more information and installation, see the <a href="https://www.npmjs.com/">Official Documentation</a>.

#### NODE

#### This tool will give us the ability to interpret JavaScript code, in a very similar way to the browser. For more information and installation, see the <a href="https://nodejs.org/en">Official Documentation</a>.

#### TYPESCRIPT

#### TypeScript supports features like autocompletion, more efficient code navigation, and inline documentation. This will significantly improve the development experience, allowing developers to work more productively and effectively. For more information and installation, see the <a href="https://www.typescriptlang.org/">Official Documentation</a>.

## Starting the project

#### Clone the project

```bash
git clone git@github.com:luizfelipegois/API-setup-node-mongoDB-typescript-swagger.git
```

#### Enter the project directory, in the project root install the dependencies

```bash
npm install
```

## Starting the server

> **Note**: By viewing the package.json file in the project root, you will have access to all available scripts

#### Use nodemon to run the main file during development

```bash
npm run dev
```

#### Use tsc to convert the .ts file in development to js

```bash
npm run build
```

#### Use node to run the main file

```bash
npm start
```

## API routes

#### The server.ts file present in the src directory has predefined routes with "/v1" being the base route

```ts
// server.ts

server.get("/v1", (req: Request, res: Response) =>
  res.status(200).json({ status: "OK" }),
)
```

#### The following routes are aimed at presenting API documentation

> **Note**: The "swagger.json" file located at the root of the project is the configuration file where you will build the entire API documentation structure that will be displayed in the routes shown below.

```ts
// server.ts

server.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.get("/v1/swagger", (req: Request, res: Response) => {
  return res.sendFile(process.cwd() + "/swagger.json")
})
server.get("/v1/docs", (req: Request, res: Response) => {
  return res.sendFile(process.cwd() + "/index.html")
})
```

#### For more information on how to build the api documentation framework with swagger, visit the official documentation.

<a href="https://petstore.swagger.io/">Swagger</a>

## Connection to mongoDB

#### If you want to have a connection to your mongoDB database, you must create a file in the root of the project and name it ".env" and fill in the environment variables as shown in the example below.

```ts
// .env

DBUSER=username
DBPASSWORD=yourpassword
DBCOLLECTION=yourcollection
```

## Running tests

> **Note**: By viewing the package.json file in the project root, you will have access to all available scripts

#### Use jest to run all tests found in files with .spec or .test

```bash
npm test
```

#### If you want to run the tests from a specific file, run the following command, replacing <file name>

```bash
npm test <file name>
```

#### Use Jest to perform test coverage

```bash
npm run test:push
```

## Lint-staged and Husky

#### The project already has a "protected commit" configured using the lint-staged and husky libraries. This means that before each commit, Eslint, Prettier and test files will be executed. The commit will only be carried out if all these checks pass successfully.

#### When building a new feature or fixing a bug, run the following command to stage these changes

```bash
git add .
```

#### Write your commit with the following command, changing the commit message as needed

```bash
git commit -m "Your explanatory message regarding the commit"
```

> **Note**: At this time, husky, through its pre-commit file in the .husky directory of the project root, will execute "npx lint-staged". Which in turn will look for predefined scripts in package.json, performing all Eslint, Prettier and testing checks before allowing commit.

#### After the commits are completed, it's time to push them to your remote repository

```bash
git push
```

> **Note**: At this time, husky, through its pre-push file in the .husky directory of the project root, will execute "npm run test:push". Which in turn will look for predefined scripts in package.json performing test coverage before pushing.

#### For more information about lint-staged and husky, access the official documentation.

<a href="https://github.com/lint-staged/lint-staged">Lint-staged</a>
<a href="https://typicode.github.io/husky/">Husky</a>
