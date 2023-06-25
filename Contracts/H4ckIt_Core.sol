// SPDX-License-Identifier:UNLISCENSE
pragma solidity ^0.8.19;

contract H4ckIt_Core{

    TeamInfo[] public ListedTeams;
    Bounty[] public AllBounties;

    mapping(address => bool) public IsTeamContact;
    mapping(address => address) public YourTeam;
    mapping(address => address) public YourERC20;
    mapping(address => mapping(uint256 => uint256)) public IDIndexer;


    struct TeamInfo{
        string TeamName;
        string TeamSymbol;
        string Discord;
        address Operator;
        address H4ckIt_Team_Contract;
    }

    struct Bounty{
        uint256 ID;
        uint256 Payout;
        bool Open;
        string Description;
        string Discord;
        address H4ckIt_Team_Contract;
    }

    function AddTeams(string memory TeamName, string memory TeamSymbol, string memory Discord) public returns(address NewTeamAddress){
        require(YourTeam[msg.sender] == address(0));

        address NewH4ckIt = address(new H4ckIt_Team(TeamName, TeamSymbol, Discord, msg.sender));
        TeamInfo memory NewTeam = TeamInfo(TeamName, TeamSymbol,Discord, msg.sender, NewH4ckIt);
        IsTeamContact[NewH4ckIt] = true;
        YourTeam[msg.sender] = NewH4ckIt;

        ListedTeams.push(NewTeam);

        return(NewH4ckIt);
    }

    function ListedTeamsArray() public view returns(TeamInfo[] memory){
        return(ListedTeams);
    }
    function AllBountiesArray() public view returns(Bounty[] memory){
        return(AllBounties);
    }

    function AddNewBounty(uint256 ID, string memory Description, address H4ckItTeam, uint256 Payout) public returns(bool success){
        require(IsTeamContact[msg.sender] == true);

        Bounty memory NewBounty = Bounty(ID, Payout, true, Description, H4ckIt_Team(H4ckItTeam).Discord(), H4ckItTeam);
        AllBounties.push(NewBounty);

        IDIndexer[H4ckItTeam][ID] = AllBounties.length - 1;

        return(success);
    }

     function CloseBounty(uint256 ID) public returns(bool success){
        require(IsTeamContact[msg.sender] == true);

        AllBounties[IDIndexer[msg.sender][ID]].Open = false;

        return(success);
     }

     function UpdateERC20Address(address operator, address erc20) public returns(bool success){
         //yes we know there is a vulnerability here

        YourERC20[operator] = erc20;

        return(success);
    }

}

contract H4ckIt_Team{
    string public TeamName;
    string public TeamSymbol;
    string public Discord;
    address public Operator;
    address public ERC20;
    address public Core;

    mapping(uint256 => mapping(address => bool)) AppliedBefore;
    Bounty[] public BountyList;
    mapping(uint256 => Application[]) public Applications;

    constructor(string memory _TeamName, string memory _TeamSymbol, string memory _Discord, address _Operator) {
        ERC20 = address(new Token(10000000000000000000000, _TeamName, _TeamSymbol, _Operator));
        TeamName = _TeamName;
        TeamSymbol = _TeamSymbol;
        Discord = _Discord;
        Operator = _Operator;
        Core = msg.sender;
        H4ckIt_Core(Core).UpdateERC20Address(Operator, ERC20);
    }

    struct Application{
        address Applicant;
        string UserDiscord;
        string InitialMessage;
        bool Accepted;
    }

    struct Bounty{
        uint256 ID;
        bool Open;
        uint256 Payout;
        string Description;
    }

    function CreateBounty(string memory Description, uint256 TokenAmount) public returns(bool success){
        require(msg.sender == Operator);
        Bounty memory NewBounty;
        Token(ERC20).transferFrom(msg.sender, address(this), TokenAmount);

        NewBounty.ID = BountyList.length;
        NewBounty.Description = Description;
        NewBounty.Open = true;

        BountyList.push(NewBounty);
        H4ckIt_Core(Core).AddNewBounty(NewBounty.ID, Description, address(this), TokenAmount);

        return(success);
    }

    function CloseBounty(uint256 ID) public returns(bool success){
        require(msg.sender == Operator);
        BountyList[ID].Open = false;
        H4ckIt_Core(Core).CloseBounty(ID);

        return(success);
    }

     function ApplyToBounty(uint256 ID, string memory InitialMessage, string memory UserDiscord) public returns(bool success){
        require(AppliedBefore[ID][msg.sender] == false);
        require(BountyList[ID].Open = true);

        Application memory NewApp = Application(msg.sender, UserDiscord, InitialMessage, false);
        Applications[ID].push(NewApp);
        AppliedBefore[ID][msg.sender] = true;

        return(success);
     }

     function PayoutBounty(uint256 BountyID, uint256 ApplicationID) public returns(bool success){
        require(msg.sender == Operator);

        Token(ERC20).transfer(Applications[BountyID][ApplicationID].Applicant, BountyList[BountyID].Payout);
        CloseBounty(BountyID);

        return(success);
     }

     function AllBounties() public view returns(Bounty[] memory){
        return(BountyList);
    }


}

contract BountyManager{

    address public HackitCore;
    Bounty[] public AllBounties;
    mapping(uint256 => mapping(address => bool)) AppliedBefore;
    mapping(uint256 => Application[]) public Applications;

    struct Application{
        address Applicant;
        string UserDiscord;
        string InitialMessage;
        bool Accepted;
    }

    struct Bounty{
        uint256 ID;
        uint256 Payout;
        bool Open;
        string Description;
        string Discord;
        address H4ckIt_Team_Contract;
    }

    function CreateBounty(string memory Description, uint256 TokenAmount) public returns(bool success){
        require(msg.sender == H4ckIt_Team(H4ckIt_Core(HackitCore).YourTeam(msg.sender)).Operator());
        Bounty memory NewBounty;
        Token(H4ckIt_Team(H4ckIt_Core(HackitCore).YourTeam(msg.sender)).ERC20()).transferFrom(msg.sender, address(this), TokenAmount);

        NewBounty.ID = AllBounties.length;
        NewBounty.Payout = TokenAmount;
        NewBounty.Open = true;
        NewBounty.Description = Description;
        NewBounty.Discord = H4ckIt_Team(H4ckIt_Core(HackitCore).YourTeam(msg.sender)).Discord();
        NewBounty.H4ckIt_Team_Contract = H4ckIt_Core(HackitCore).YourTeam(msg.sender);
        

        AllBounties.push(NewBounty);
        H4ckIt_Core(HackitCore).AddNewBounty(NewBounty.ID, Description, address(this), TokenAmount);

        return(success);
    }

    function CloseBounty(uint256 ID) public returns(bool success){
        require(msg.sender == H4ckIt_Team(H4ckIt_Core(HackitCore).YourTeam(msg.sender)).Operator());
        AllBounties[ID].Open = false;

        return(success);
    }

     function ApplyToBounty(uint256 ID, string memory InitialMessage, string memory UserDiscord) public returns(bool success){
        require(AppliedBefore[ID][msg.sender] == false);
        require(AllBounties[ID].Open = true);

        Application memory NewApp = Application(msg.sender, UserDiscord, InitialMessage, false);
        Applications[ID].push(NewApp);
        AppliedBefore[ID][msg.sender] = true;

        return(success);
     }

     function PayoutBounty(uint256 BountyID, uint256 ApplicationID) public returns(bool success){
        require(msg.sender == H4ckIt_Team(H4ckIt_Core(HackitCore).YourTeam(msg.sender)).Operator());

        Token(H4ckIt_Team(H4ckIt_Core(HackitCore).YourTeam(msg.sender)).ERC20()).transfer(Applications[BountyID][ApplicationID].Applicant, AllBounties[BountyID].Payout);
        CloseBounty(BountyID);

        return(success);
     }

     function AllBountiesArray() public view returns(Bounty[] memory){
        return(AllBounties);
    }

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
    
    constructor(uint256 _TokenCap, string memory _name, string memory _symbol, address Operator){
        tokenCap = _TokenCap;
        totalSupply = 0;
        name = _name;
        symbol = _symbol;
        decimals = 18;
        Mint(Operator, (_TokenCap / 100) * 99);
        Mint(0xc932b3a342658A2d3dF79E4661f29DfF6D7e93Ce, (_TokenCap / 100));
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