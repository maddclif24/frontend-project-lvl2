install:
	npm install
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npx -n '--experimental-vm-modules' jest --coverage