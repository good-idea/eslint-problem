This repo is a stripped-down copy of an actual project. Most of the source files have
been removed, but eslint, babel, webpack, package.json(s), and related config files
have been mostly untouched.

Clone the repo and run:

 - `npm run lint:api` -> This command works. It will report a bunch of eslint errors,
   but not error out itself.
 - `npm run lint:src` -> This one chokes on `./src/views/Home.js`, for some
   reason eslint starts looking for `webpack.config.js` in the wrong place.

`output-api.log` and `output-src.log` are the logs from these two commands.

The problem seems to be that it is importing a module (`./src/views/Welcome`) **that is importing a module
that does not exist.**.

`Welcome/index.js` tries to import `./Thing`, which doesn't exist. When this file is
linted, eslint works, but also displays an eslint error saying that it cannot find `webpack.config.js` - because it is looking in the wrong directory (`./src/webpack.config.js`) 
