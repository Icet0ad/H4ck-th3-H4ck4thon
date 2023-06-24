pragma solidity ^0.8.19;

contract TeamPrizesTokenIssuer{

    TeamListing[] public ListedTeams;

    struct TeamListing{
        string TeamName;
        string TeamSymbol;
        string Discord;
        address Operator;
        address ERC20;
    }

    function ListTeams(string memory TeamName, string memory TeamSymbol, string memory Discord) public returns(address NewToken){
        address NewERC20 = address(new H4ckIt_Team(TeamName, TeamSymbol, Discord, msg.sender));
        TeamListing memory NewTeam = TeamListing(TeamName, TeamSymbol,Discord, msg.sender, NewERC20);

        ListedTeams.push(NewTeam);
    }

}

contract H4ckIt_Team{
    string public TeamName;
    string public TeamSymbol;
    string public Discord;
    address public Operator;
    address public ERC20;

    mapping(uint256 => Bounty) public BountyIndex;

    constructor(string memory _TeamName, string memory _TeamSymbol, string memory _Discord, address _Operator){
        ERC20 = address(new Token(10000000000000000000000, TeamName, TeamSymbol));
        TeamName = _TeamName;
        TeamSymbol = _TeamSymbol;
        Discord = _Discord;
        Operator = _Operator;
    }

    struct Application{
        address Applicant;
        string Discord;
        bool Accepted;
    }

    struct Bounty{
        uint256 ID;
        string Description;
        string Discord;
        mapping(address => bool) AppliedBefore;
        Application[] Applications;
    }

    function CreateBounty()

}

contract Token {
    uint256 public tokenCap;
    uint256 public totalSupply;
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
    
    constructor(uint256 _TokenCap, string memory _name, string memory _symbol){
        tokenCap = _TokenCap;
        totalSupply = 0;
        name = _name;
        symbol = _symbol;
        decimals = 18;
        Mint(msg.sender, _TokenCap);
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
        require (totalSupply+(_MintAmount) <= tokenCap);
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