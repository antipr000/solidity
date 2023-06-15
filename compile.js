const { readFileSync, read } = require("fs");
const { resolve } = require("path");
const solc = require("solc");

// const inboxPath = resolve(__dirname, "contracts", "Inbox.sol");
// const inboxSource = readFileSync(inboxPath, "utf8");

const lotteryPath = resolve(__dirname, "contracts", "Lottery.sol");
const lotterySource = readFileSync(lotteryPath, "utf8");

module.exports = {
  //   Inbox: solc.compile(inboxSource, 1).contracts[":Inbox"],
  Lottery: solc.compile(lotterySource, 1).contracts[":Lottery"],
};
