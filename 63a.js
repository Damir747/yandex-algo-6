const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.toString().split('\n');
if (lines.length > 0) {

	const str = lines[0].trim();
	function check(str) {
		const stack = [];
		for (let i = 0; i < str.length; i++) {
			if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
				stack.push(str[i]);
			} else {
				if (stack.length === 0) {
					return 'no';
				}
				const elem = stack.pop();
				if ((str[i] === ')' && elem !== '(') || (str[i] === ']' && elem !== '[') || (str[i] === '}' && elem !== '{')) {
					return 'no';
				}
			}
		}
		if (stack.length === 0) {
			return 'yes';
		}
		return 'no';

	}

	fs.writeFileSync('output.txt', check(str).toString());
}

