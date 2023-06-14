const { readFileSync } = require("fs");
const { resolve } = require("path");
const solc = require("solc");

const inboxPath = resolve(__dirname, "contracts", "Inbox.sol");
const source = readFileSync(inboxPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Inbox"];
