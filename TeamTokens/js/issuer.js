await signIn()
let accounts
let provider
let signer

let erc20ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]

let teamTokenABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "H4ckItTeam",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Payout",
				"type": "uint256"
			}
		],
		"name": "AddNewBounty",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "TeamName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "TeamSymbol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Discord",
				"type": "string"
			}
		],
		"name": "AddTeams",
		"outputs": [
			{
				"internalType": "address",
				"name": "NewTeamAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AllBountiesArray",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "ID",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "Payout",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "Open",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "Description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Discord",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "H4ckIt_Team_Contract",
						"type": "address"
					}
				],
				"internalType": "struct H4ckIt_Core.Bounty[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ID",
				"type": "uint256"
			}
		],
		"name": "CloseBounty",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "IDIndexer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "IsTeamContact",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ListedTeams",
		"outputs": [
			{
				"internalType": "string",
				"name": "TeamName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "TeamSymbol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Discord",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Operator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "H4ckIt_Team_Contract",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ListedTeamsArray",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "TeamName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "TeamSymbol",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Discord",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "Operator",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "H4ckIt_Team_Contract",
						"type": "address"
					}
				],
				"internalType": "struct H4ckIt_Core.TeamInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "YourTeam",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let tokenContract
let tokenContractAddress = "0x92e52a1A235d9A103D970901066CE910AAceFD37" 

let HackItCore
let HackItCoreAddress = "0xacBD0A0Bc717B475D62bd1b16deEeD7cEeC6E238"


async function signIn() {
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            // Ethereum user detected. You can now use the provider.
            provider = new ethers.BrowserProvider(window.ethereum);

            // Request account access
            await window.ethereum.enable();

            // Getting accounts
            accounts = await provider.listAccounts();
            if (accounts.length == 0) {
                console.log('No account found! Make sure the Ethereum client is configured correctly.');
                return null;
            } else {
                console.log(`Account: ${accounts[0]}`);
            }

            signer = await provider.getSigner();

            await getAddress()
            await getEthBalance()
            await initToken()
            //await getBalance()
            await initTeamTokens()
            await displayTeamTokens()

        } else {
            console.log('Please install MetaMask!');
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function initToken(){
    tokenContract = new ethers.Contract(tokenContractAddress, erc20ABI, provider);
}

async function initTeamTokens() {
    HackItCore = new ethers.Contract(HackItCoreAddress, window.CoreABI, signer)
}

async function getAddress() {
    document.getElementById("addressLabel").innerHTML = "Your Address: " + signer.address
}

async function getEthBalance() {
    console.log("getEthBalance")
    let balance = await provider.getBalance(signer.address)
    balance = ethers.formatEther(balance)
    document.getElementById("ethBalanceLabel").innerHTML = "xDAI Balance: " + balance
}

async function deployToken() {
    let teamName =  document.getElementById("teamNameInput").value 
    let tokenSymbol = document.getElementById("tokenSymbolInput").value
    let Discord = document.getElementById("DiscordServerInput").value
    console.log(teamName)
    console.log(tokenSymbol);
    try{
        await HackItCore.AddTeams(teamName,tokenSymbol,Discord);
    }
    catch(err){
        alert("You already created a team!")
    }
}

async function getBalance() {
    let amount = await tokenContract.balanceOf(signer.address)
    document.getElementById("tokenLabel").innerHTML = amount + " Tokens"
}

async function displayTeamTokens(){
    const teams = await HackItCore.ListedTeamsArray();
    
    // Loop through each team
    teams.forEach((team, index) => {
        // Create a new div element
        const teamDiv = document.createElement('div');
        
        // Set the content of the div
        teamDiv.innerHTML = `
            <h2>Team ${index + 1}</h2>
            <p>Team Name: ${team[0]}</p>
            <p>Team's Domain: ${team[1]}</p>
            <p>Discord Link: ${team[2]}</p>
            <p>Ethereum address 1: ${team[3]}</p>
            <p>Ethereum address 2: ${team[4]}</p>
        `;
        
        // Append the new div to the end of the body
        document.body.appendChild(teamDiv);
    });
}