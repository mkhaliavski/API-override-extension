extension: clean verify build copy

dev: running

clean:
	@echo "--------------[CLEAN]--------------"
	rm -rf ./dist
	mkdir ./dist

verify:
	@echo "--------------[VERIFY]--------------"
	cd ./ui; tsc

build:
	@echo "--------------[BUILD]--------------"
	cd ./ui; vite --config vite.config.ts build

copy-build:
	@echo "--------------[COPY BUILD]--------------"
	mv ./ui/dist/* ./dist/
	rm -rf ./ui/dist

copy-files:
	@echo "--------------[COPY-EXTENSION-FILES]--------------"
	find ./extension -type f | xargs -I % cp % ./dist/

copy: copy-build copy-files


running:
	@echo "--------------[RUNNING]--------------"
	cd ./ui; vite --config vite.config.ts