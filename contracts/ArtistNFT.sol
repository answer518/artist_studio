// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ArtistNFT is ERC721, ERC721URIStorage {
    uint256 private _tokenIdCounter;

    constructor() ERC721("ArtistNFT", "ANFT") {}

    function mint(address artist, string memory uri) public returns (uint256) {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        
        _safeMint(artist, newTokenId);
        _setTokenURI(newTokenId, uri);
        
        return newTokenId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function getTotalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
