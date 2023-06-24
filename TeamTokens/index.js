function login() {
    
}
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
		"name": "addTeam",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTeamTokens",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
		"name": "teamTokens",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "teams",
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let tokenContract
let tokenContractAddress = "0x92e52a1A235d9A103D970901066CE910AAceFD37" 

let teamTokensContract
let teamTokensContractAddress = "0x7a5B3dAfc2e4b98762c52B1093B4BF91EBbBDE4c"


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
    teamTokensContract = new ethers.Contract(teamTokensContractAddress, teamTokenABI, signer)
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
    console.log(teamName)
    console.log(tokenSymbol)
    await teamTokensContract.addTeam(teamName,tokenSymbol,"")
}

async function getBalance() {
    let amount = await tokenContract.balanceOf(signer.address)
    document.getElementById("tokenLabel").innerHTML = amount + " Tokens"
}

async function getTeamTokens(){
    let teamTokens = await teamTokensContract.getTeamTokens()
// First, we get all team tokens
const teamTokens = await teamTokensContract.getTeamTokens();

// Create a table and a header row
let table = document.createElement('table');
let headerRow = document.createElement('tr');

['Team', 'Symbol', 'Address'].forEach(headerText => {
  let th = document.createElement('th');
  th.textContent = headerText;
  headerRow.appendChild(th);
});

table.appendChild(headerRow);

// Then, for each team token, we get its info and create a table row
teamTokens.forEach(async (tokenAddress) => {
  const tokenInfo = await teamTokensContract.teams(tokenAddress);
  
  // Create a new row and cells for the data
  let row = document.createElement('tr');
  let teamCell = document.createElement('td');
  let symbolCell = document.createElement('td');
  let addressCell = document.createElement('td');

  // Assign data to cells
  teamCell.textContent = tokenInfo[0];
  symbolCell.textContent = tokenInfo[1];
  addressCell.textContent = tokenInfo[3];

  // Append cells to row
  row.appendChild(teamCell);
  row.appendChild(symbolCell);
  row.appendChild(addressCell);

  // Append row to table
  table.appendChild(row);
});

// Append table to body (or another existing HTML element)
document.body.appendChild(table);
    });
    
}