install:
	npm install

start:
	npx babel-node src/bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

plain:
	npx babel-node src/bin/gendiff.js before.json after.json
