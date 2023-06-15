@echo off

start npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch --minify
start tsc -w
node index.js