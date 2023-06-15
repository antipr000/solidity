const assert = require("assert");
const ganache = require("ganache-cli");
const { Web3 } = require("web3"); // Web3 is a constructor function
const { Inbox } = require("../compile");

const { bytecode, interface } = Inbox;

const web3 = new Web3(ganache.provider()); // web3 is an instance of Web3
let testAccountAddress;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  const testAccounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  testAccountAddress = testAccounts[0];
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there!"],
    })
    .send({
      from: testAccountAddress,
      gas: "1000000",
    });
});

describe("Inbox", () => {
  it("verifies initial message", async () => {
    assert.equal("Hi there!", await inbox.methods.message().call());
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("Bye").send({ from: testAccountAddress });
    assert.equal("Bye", await inbox.methods.message().call());
  });
});
