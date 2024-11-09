const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.trim().split('\n');

const n = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

function lapnand(n, arr) {
	const result = new Array(n).fill(-1);
	const stack = [];

	for (let i = 0; i < n; i++) {
		while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
			result[stack.pop()] = i;
		}
		stack.push(i);
	}
	return result.join(' ');
}

fs.writeFileSync('output.txt', lapnand(n, arr));
