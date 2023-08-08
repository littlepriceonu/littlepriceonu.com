#!/usr/bin/env node

const { execSync } = require("child_process");

require('dotenv').config();

const token = process.env.TOKEN

console.log(`i hate this`)
console.log(`${token}`)

execSync(`echo //npm.pkg.github.com/:_authToken=${token}◙@littlepriceonu:registry=https://npm.pkg.github.com > .npmrc`)