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

let H4ckItTeamABI =  [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_TeamName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_TeamSymbol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Discord",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_Operator",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AllBounties",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "ID",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "Open",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "Payout",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "Description",
						"type": "string"
					}
				],
				"internalType": "struct H4ckIt_Team.Bounty[]",
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
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Applications",
		"outputs": [
			{
				"internalType": "address",
				"name": "Applicant",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "UserDiscord",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "InitialMessage",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "Accepted",
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
				"name": "ID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "InitialMessage",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "UserDiscord",
				"type": "string"
			}
		],
		"name": "ApplyToBounty",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "BountyList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ID",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "Open",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "Payout",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "Description",
				"type": "string"
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
		"inputs": [],
		"name": "Core",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "Description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "TokenAmount",
				"type": "uint256"
			}
		],
		"name": "CreateBounty",
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
		"inputs": [],
		"name": "Discord",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ERC20",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Operator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "BountyID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ApplicationID",
				"type": "uint256"
			}
		],
		"name": "PayoutBounty",
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
		"inputs": [],
		"name": "TeamName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TeamSymbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let tokenContract
let tokenContractAddress = "0x92e52a1A235d9A103D970901066CE910AAceFD37" 

let HackItCore
let HackItCoreAddress = "0x5746eaa502e5d3be968c4573c475bbe8e28c667e"


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

			const network = await provider.getNetwork();

			if (Number(network.chainId) !== 100) {
				alert("Unsupported Chain ID. Please switch to Gnosis Chain (100).");
				throw new Error("Unsupported Chain ID");
			}

            signer = await provider.getSigner();
			

            await getAddress()
            await getEthBalance()
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

signIn()