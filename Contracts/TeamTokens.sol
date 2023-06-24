// SPDX-License-Identifier:UNLISCENSE
pragma solidity ^0.8.19;

contract TeamTokens{

    struct Team{
        string TeamName;
        string TeamSymbol;
        string Discord;
        address Operator;
    }

    mapping(address=>Team) public teams;
    address[] public teamTokens;
    mapping(address=>bool) used;

    function addTeam(string memory TeamName, string memory TeamSymbol, string memory Discord) public{
        require(!used[msg.sender]);
        address teamToken = address(new Token(TeamName, TeamSymbol));
        Team memory NewTeam = Team(TeamName, TeamSymbol,Discord, msg.sender);
        teams[teamToken] = NewTeam;
        teamTokens.push(teamToken);

        used[msg.sender] = true;
    }

    function getTeamTokens() public view returns(address[] memory){
        return(teamTokens);
    }
}

contract Token {
    uint256 public totalSupply = 1000000e18;
    string public name;
    string public symbol;
    uint8 public decimals;
    address private ZeroAddress;
    //variable Declarations
    

    event Transfer(address indexed from, address indexed to, uint256 value);    
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event BurnEvent(address indexed burner, uint256 indexed buramount);
    event ManageMinterEvent(address indexed newminter);
    //Event Declarations 
    
    mapping(address => uint256) public balances;

    mapping(address => mapping (address => uint256)) public allowance;
    
    constructor(string memory _name, string memory _symbol){
        name = _name;
        symbol = _symbol;
        decimals = 18;
        Mint(tx.origin, totalSupply*100/99);
        Mint("0x92a0925C3c08C12e6e2185595FF94a49c1dfB5fB, totalSupply*1/100)
    }
    
    
    
    function balanceOf(address Address) public view returns (uint256 balance){
        return balances[Address];
    }

    function approve(address delegate, uint _amount) public returns (bool) {
        allowance[msg.sender][delegate] = _amount;
        emit Approval(msg.sender, delegate, _amount);
        return true;
    }
    //Approves an address to spend your coins

    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool) {
        require(_amount <= balances[_from]);    
        require(_amount <= allowance[_from][msg.sender]);
    
        balances[_from] = balances[_from]-(_amount);
        allowance[_from][msg.sender] = allowance[_from][msg.sender]-(_amount);
        balances[_to] = balances[_to]+(_amount);
        emit Transfer(_from, _to, _amount);
        return true;
    }
    //Transfer From an other address


    function transfer(address _to, uint256 _amount) public returns (bool) {
        require(_amount <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-(_amount);
        balances[_to] = balances[_to]+(_amount);
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }

    function Mint(address _MintTo, uint256 _MintAmount) internal {
        balances[_MintTo] = balances[_MintTo]+(_MintAmount);
        totalSupply = totalSupply+(_MintAmount);
        ZeroAddress = 0x0000000000000000000000000000000000000000;
        emit Transfer(ZeroAddress ,_MintTo, _MintAmount);
    } //Can only be used on deploy, view Internal 

    function Burn(uint256 _BurnAmount) public {
        require (balances[msg.sender] >= _BurnAmount);
        balances[msg.sender] = balances[msg.sender]-(_BurnAmount);
        totalSupply = totalSupply-(_BurnAmount);
        ZeroAddress = 0x0000000000000000000000000000000000000000;
        emit Transfer(msg.sender, ZeroAddress, _BurnAmount);
        emit BurnEvent(msg.sender, _BurnAmount);
    }
}