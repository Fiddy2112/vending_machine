const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VendingModule", (m) => {
  const vending = m.contract("Vending");

  return { vending };
});
