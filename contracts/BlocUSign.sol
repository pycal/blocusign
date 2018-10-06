pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract BlocUSign is ERC721Token {
    string constant BLAH = "123";

    constructor () public
        ERC721Token("BlocUSign", "BLCUSIGN")
    {
    }

    event DocumentSigned(uint256 indexed _documentId);

    enum State {
        Unsigned,
        Signed
    }
    
    struct Document {
        State state;
        address requester;
        address signatory;
        string data;
    }

    mapping(uint256 => Document) documentIdToDocument;

    function documentState(uint256 _documentId) public view returns(State) {
        return documentIdToDocument[_documentId].state;
    }

    function documentRequester(uint256 _documentId) public view returns(address) {
        return documentIdToDocument[_documentId].requester;
    }

    function documentSignatory(uint256 _documentId) public view returns(address) {
        return documentIdToDocument[_documentId].signatory;
    }

    function documentData(uint256 _documentId) public view returns(string) {
        return documentIdToDocument[_documentId].data;
    }

    function createDocument(address _signatory,  string _data) public {
        uint256 newId = totalSupply().add(1); // just always increment by 1
        super._mint(msg.sender, newId);
        documentIdToDocument[newId] = Document({
            state: State.Unsigned,
            requester: msg.sender,
            signatory: _signatory,
            data: _data
        });
    }
    
    function sign(uint256 _documentId) public {
        require(msg.sender == documentIdToDocument[_documentId].signatory);
        require(documentIdToDocument[_documentId].state == State.Unsigned);
        documentIdToDocument[_documentId].state = State.Signed;
        DocumentSigned(_documentId);
    }
}