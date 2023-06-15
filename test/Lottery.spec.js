const assert = require("assert");
const { Lottery } = require("../compile");
const ganache = require("ganache-cli");
const { Web3, utils } = require("web3");

console.log(Lottery);

const { bytecode, interface } = Lottery;

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;
let managerAccount;

beforeEach(async () => {
  accounts = web3.eth.getAccounts();

  managerAccount = accounts[0];

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({
      from: managerAccount,
      gas: "1000000",
    });
});

describe("Lottery Tests", () => {
  it("Basic test", async () => {
    console.log(lottery);
  });
  it.skip("should enter lottery", async () => {
    // Enter lottery from first account
    await lottery.methods.enter().send({
      from: accounts[1],
      value: utils.toWei("0.02", "ether"),
    });

    // Enter lottery from second account
    await lottery.methods.enter().send({
      from: accounts[2],
      value: utils.toWei("0.03", "ether"),
    });

    // Get all participants
    const participants = await lottery.methods.getAllParticipants().call({
      from: managerAccount,
    });

    assert.deepEqual(participants, [accounts[1], accounts[2]]);
  });
});
