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
let HackItCoreAddress = "0xF2884E217e6Bc8670A559a0e40dAC6202dd4a66a"

let CurrentHackItTeam;
let CurrentHackItTeamAddress;


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

            document.getElementById('signInButton').innerText = "Connected"
            document.getElementById('bounties').innerHTML = '';
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

  async function convertWeiToEther(weiAmount) {
    const etherAmount = BigInt(weiAmount) / BigInt(10 ** 18);
    return etherAmount;
  }

  async function convertEtherToWei(etherAmount) {
	const weiAmount = BigInt(etherAmount) * BigInt(10 ** 18);
	return weiAmount;
  }

SuccessText

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

async function CreateBounty() {
	ERC20 = await new ethers.Contract(await HackItCore.YourERC20(accounts[0].address), erc20ABI, signer)
	if(await ERC20.allowance(accounts[0].address, await HackItCore.YourTeam(accounts[0].address)) === BigInt(0)){
		let tx = await ERC20.approve(await HackItCore.YourTeam(accounts[0].address), BigInt(1000000000000000000000000000000000000000000))
		await tx.wait();
		console.log(tx)
	}

	CurrentHackItTeam = await new ethers.Contract(await HackItCore.YourTeam(accounts[0].address), window.TeamABI, signer);
	await CurrentHackItTeam.CreateBounty(document.getElementById('BountyDescInput').value, BigInt(await convertEtherToWei(document.getElementById('AmountInput').value)))

	document.getElementById('SuccessText').innerHTML = "Success! Go see your new bounty at<a href='/findbounties'>here.<a>"
}

async function LoadBounties() {
    const allBounties = await HackItCore.AllBountiesArray();

    const allBountiesArray = allBounties.map((bounty) => {
      return {
        ID: bounty.ID.toString(),
        Payout: bounty.Payout.toString(),
        Open: bounty.Open,
        Description: bounty.Description,
        Discord: bounty.Discord,
        H4ckIt_Team_Contract: bounty.H4ckIt_Team_Contract,
      };
    });

	let filter = HackItCore.YourTeam(accounts[0].address);

	MyBounties = allBountiesArray.filter((element) => { return element.includes(filter); });
	console.log(MyBounties);
    createBountiesDiv(allBountiesArray);
}

async function createBountiesDiv(bountiesArray) {
    const bountiesContainer = document.getElementById('bounties');
  
    for (let i = bountiesArray.length - 1; i >= 0; i--) {
      const bounty = bountiesArray[i];
  
      // Create a div element for the bounty
      const bountyDiv = document.createElement('box');
      bountyDiv.classList.add('bounty-box');
      bountyDiv.id = bounty.ID;
  
      // Convert payout from wei to ether
      const payoutEther = await convertWeiToEther(bounty.Payout);
  
      // Apply bold and slightly bigger styling to the text
      const style = 'font-weight: bold; font-size: 1.1em;';
  
      // Add information about the bounty to the div
      bountyDiv.innerHTML = `
      <p><strong>Payout:</strong> ${payoutEther} Team Prize Tokens</p>
      <p><strong>Status:</strong> ${bounty.Open ? 'Open' : 'Closed'}</p>
      <p><strong>Description:</strong> ${bounty.Description}</p>
      <p><strong>Discord:</strong> <a href="${bounty.Discord}">${bounty.Discord}</a></p>
      <p><strong>Team Contract:</strong> ${bounty.H4ckIt_Team_Contract}</p>
      <button style="max-width: 10vw" onclick="Apply('${bounty.H4ckIt_Team_Contract}', '${bounty.ID}')">Apply</button>
    `;
  
      // Append the bounty div to the container
      const br = document.createElement('br');
      bountiesContainer.appendChild(br);
      bountiesContainer.appendChild(bountyDiv);
    }
  }


async function getBalance() {
    let amount = await tokenContract.balanceOf(signer.address)
    document.getElementById("tokenLabel").innerHTML = amount + " Tokens"
}

signIn()