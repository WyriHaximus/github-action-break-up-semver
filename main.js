const version = require('semver/functions/parse')(process.env.INPUT_VERSION);
const fs = require('fs');

fs.appendFileSync(process.env.GITHUB_OUTPUT, `major=${version.major}\n`);
fs.appendFileSync(process.env.GITHUB_OUTPUT, `v_major=v${version.major}\n`);
fs.appendFileSync(process.env.GITHUB_OUTPUT, `minor=${version.minor}\n`);
fs.appendFileSync(process.env.GITHUB_OUTPUT, `patch=${version.patch}\n`);
fs.appendFileSync(process.env.GITHUB_OUTPUT, `major_minor=${version.major}.${version.minor}\n`);
fs.appendFileSync(process.env.GITHUB_OUTPUT, `v_major_minor=v${version.major}.${version.minor}\n`);
fs.appendFileSync(process.env.GITHUB_OUTPUT, `major_minor_patch=${version.major}.${version.minor}.${version.patch}\n`);
fs.appendFileSync(process.env.GITHUB_OUTPUT, `v_major_minor_patch=v${version.major}.${version.minor}.${version.patch}\n`);
