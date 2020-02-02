install:
	npm install

start:
	npx node src/bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .
