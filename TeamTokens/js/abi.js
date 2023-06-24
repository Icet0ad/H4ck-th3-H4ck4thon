window.CoreABI = [ { "inputs": [ { "internalType": "uint256", "name": "ID", "type": "uint256" }, { "internalType": "string", "name": "Description", "type": "string" }, { "internalType": "address", "name": "H4ckItTeam", "type": "address" }, { "internalType": "uint256", "name": "Payout", "type": "uint256" } ], "name": "AddNewBounty", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "TeamName", "type": "string" }, { "internalType": "string", "name": "TeamSymbol", "type": "string" }, { "internalType": "string", "name": "Discord", "type": "string" } ], "name": "AddTeams", "outputs": [ { "internalType": "address", "name": "NewTeamAddress", "type": "address" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "AllBountiesArray", "outputs": [ { "components": [ { "internalType": "uint256", "name": "ID", "type": "uint256" }, { "internalType": "uint256", "name": "Payout", "type": "uint256" }, { "internalType": "bool", "name": "Open", "type": "bool" }, { "internalType": "string", "name": "Description", "type": "string" }, { "internalType": "string", "name": "Discord", "type": "string" }, { "internalType": "address", "name": "H4ckIt_Team_Contract", "type": "address" } ], "internalType": "struct H4ckIt_Core.Bounty[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "ID", "type": "uint256" } ], "name": "CloseBounty", "outputs": [ { "internalType": "bool", "name": "success", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "IDIndexer", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "IsTeamContact", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "ListedTeams", "outputs": [ { "internalType": "string", "name": "TeamName", "type": "string" }, { "internalType": "string", "name": "TeamSymbol", "type": "string" }, { "internalType": "string", "name": "Discord", "type": "string" }, { "internalType": "address", "name": "Operator", "type": "address" }, { "internalType": "address", "name": "H4ckIt_Team_Contract", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "ListedTeamsArray", "outputs": [ { "components": [ { "internalType": "string", "name": "TeamName", "type": "string" }, { "internalType": "string", "name": "TeamSymbol", "type": "string" }, { "internalType": "string", "name": "Discord", "type": "string" }, { "internalType": "address", "name": "Operator", "type": "address" }, { "internalType": "address", "name": "H4ckIt_Team_Contract", "type": "address" } ], "internalType": "struct H4ckIt_Core.TeamInfo[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "YourTeam", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ]

window.TeamABI =[
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