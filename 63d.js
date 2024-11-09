const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.trim().split('\n');

const arr = lines[0].trim().split(' ');

function calc(arr) {

	const stack = [];

	for (let i = 0; i < arr.length; i++) {
		const element = arr[i];
		if (element === '*' || element === '/' || element === '+' || element === '-') {
			const operand2 = stack.pop();
			const operand1 = stack.pop();
			if (element === '*') {
				stack.push(operand1 * operand2);
			} else if (element === '/') {
				stack.push(operand1 / operand2);
			} else if (element === '+') {
				stack.push(operand1 + operand2);
			} else if (element === '-') {
				stack.push(operand1 - operand2);
			}

		} else {
			stack.push(+element);
		}
	}
	return stack[stack.length - 1];
}

fs.writeFileSync('output.txt', calc(arr).toString());
