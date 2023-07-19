extension: clean verify build copy

dev: dev

clean:
	@echo "--------------[CLEAN]--------------"
	rm -rf ./dist
	mkdir ./dist

verify:
	@echo "--------------[VERIFY]--------------"
	tsc

build:
	@echo "--------------[BUILD]--------------"
	vite --config vite.config.build.ts build

copy:
	@echo "--------------[COPY]--------------"
	cp manifest.json ./dist/manifest.json
	cp icon.png ./dist/icon.png
	mkdir ./dist/scripts
	cp -R ./src/extension/scripts/* ./dist/scripts/
	cp ./src/extension/devtools.html ./dist/devtools.html


dev:
	@echo "--------------[RUNNING]--------------"
	cd ./src/dev; vite --config vite.config.ts