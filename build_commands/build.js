#!/usr/bin/env node

const { execSync } = require("child_process");

require('dotenv').config();

const token = process.env.TOKEN

execSync(`echo i hate this`)
execSync(`echo ${token}`)

execSync(`echo //npm.pkg.github.com/:_authToken=${token}◙@littlepriceonu:registry=https://npm.pkg.github.com > .npmrc`)