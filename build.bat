@echo off

start npx postcss ./src/css/index.css -d ./dist/ --watch
start tsc -w