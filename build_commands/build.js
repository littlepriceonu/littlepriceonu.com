#!/usr/bin/env node

const { execSync } = require("child_process");

require('dotenv').config();

const token = process.env.TOKEN

execSync(`echo @littlepriceonu:registry=https://npm.pkg.github.com◙//npm.pkg.github.com/:_authToken=${token} > .npmrc`)