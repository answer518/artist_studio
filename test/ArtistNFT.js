const {
  // time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ArtistNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNftFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const ArtistNFT = await ethers.getContractFactory("ArtistNFT");
    const nft = await ArtistNFT.deploy();

    return { nft, owner, otherAccount };
  }

  describe("Mint", function () {
    it("Should mint correctly", async function () {
      const { nft, owner } = await loadFixture(deployNftFixture);
      const addr = await owner.getAddress();

      await nft.mint(addr, "http://www.baidu.com/")
      expect(await nft.tokenURI(1)).to.equal("http://www.baidu.com/");
    });
  });

});
