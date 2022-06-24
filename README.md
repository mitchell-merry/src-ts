# src-ts
A TypeScript library providing functions to interface with and to describe the shape of the [public speedrun.com REST API](https://github.com/speedruncomorg/api) (v1).

- Types are defined under `/types`.
- Other utilities are defined under `/src`.

Find the package on npmjs.com [here](https://www.npmjs.com/package/src-ts).

## Installation
With Node and npm installed (or equivalent):
```
npm i src-ts
```
If you wish to *just* use the type definitions provided (under `/types`), I recommend you install as a dev dependency only (with the `--save-dev` flag).

## Use
Import or require from 'src-ts' and you will have access to everything.

I recommend you use an identifier such as `SRC` to house the library, like so:
```js
import * as SRC from 'src-ts';	// Modules
const SRC = require('src-ts');	// CommonJS

SRC.getGame('wys');	// returns a promise
```

But nothing stops you from doing it like so:
```js
import { getGame } from 'src-ts';		// Modules
const { getGame } = require('src-ts');	// CommonJS

getGame('wys');
```

For TypeScript, access is provided to the types under the same import:
```ts
import * as SRC from 'src-ts';

function doThingWithGame(game: SRC.Game) { ... }
```

Or, using the second method:
```ts
import { Game } from 'src-ts';

function doThingWithGame(game: Game) { ... }
```
Extensive documentation on functions and types ~~can be found on the wiki~~ is coming to the wiki, eventually.

## Build & Local Install
Clone or fork the repository, and then run the `build` npm script:
```bash
git clone https://github.com/mitchell-merry/src-ts.git
npm install
npm run build					# Build library files
npm pack				 		# Pack the tarball
```

To test-install it in another project (run after `npm run build` on src-ts):
```bash
npm install <path-to-tarball>	# Install the tarball in the current project
```

For example, if I have a project `test-p` next to my clone of `src-ts`:
```bash
src-ts> npm run build		# Creates /lib folder in src-ts
src-ts> npm pack			# Creates 'src-ts-1.1.1.tgz' in src-ts
src-ts> cd ../test
test-p> npm install ../src-ts/src-ts-1.1.1.tgz	# Installs local src-ts
```
