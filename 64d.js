const fs = require('fs');

class TreeNode {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinaryTree {
	constructor() {
		this.root = null;
	}

	add(value) {
		if (this.root === null) {
			this.root = new TreeNode(value);
			return 'DONE';
		}

		let currentNode = this.root;
		while (true) {
			if (value === currentNode.value) {
				return 'ALREADY';
			} else if (value < currentNode.value) {
				if (currentNode.left === null) {
					currentNode.left = new TreeNode(value);
					return 'DONE';
				} else {
					currentNode = currentNode.left;
				}
			} else {
				if (currentNode.right === null) {
					currentNode.right = new TreeNode(value);
					return 'DONE';
				} else {
					currentNode = currentNode.right;
				}
			}
		}
	}

	search(value) {
		let currentNode = this.root;
		while (currentNode !== null) {
			if (value === currentNode.value) {
				return 'YES';
			} else if (value < currentNode.value) {
				currentNode = currentNode.left;
			} else {
				currentNode = currentNode.right;
			}
		}
		return 'NO';
	}

	printTree() {
		const result = [];

		function traverse(node, depth) {
			if (node === null) return;
			traverse(node.left, depth + 1);
			result.push('.'.repeat(depth) + node.value);
			traverse(node.right, depth + 1);
		}

		traverse(this.root, 0);
		return result.join('\n');
	}
}

function processCommands(commands) {
	const tree = new BinaryTree();
	const results = [];

	for (const command of commands) {
		const [action, value] = command.split(' ');
		if (action === 'ADD') {
			results.push(tree.add(parseInt(value, 10)));
		} else if (action === 'SEARCH') {
			results.push(tree.search(parseInt(value, 10)));
		} else if (action === 'PRINTTREE') {
			results.push(tree.printTree());
		}
	}

	return results.join('\n');
}

// Чтение данных
const input = fs.readFileSync('input.txt', 'utf8').trim().split('\n');
const result = processCommands(input);

// Запись результата
fs.writeFileSync('output.txt', result);
