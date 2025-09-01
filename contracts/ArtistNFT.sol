// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ArtistNFT is ERC721URIStorage, ERC721Enumerable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("ArtistNFT", "ANFT") {}

    function mint(address to, string memory uri) public returns (uint256) {
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, uri);
        
        return newTokenId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth) 
        internal 
        virtual 
        override(ERC721, ERC721Enumerable) 
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 amount) 
        internal 
        virtual 
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, amount);
    }
}
