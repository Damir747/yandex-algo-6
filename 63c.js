const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.trim().split('\n');

const [n, k] = lines[0].split(' ').map(Number);;
const arr = lines[1].split(' ').map(Number);

function segmentMin(n, k, arr) {
	const result = [];
	const deque = [];

	for (let i = 0; i < n; i++) {
		if (deque.length > 0 && deque[0] < i - k + 1) {
			deque.shift();
		}

		while (deque.length > 0 && arr[deque[deque.length - 1]] >= arr[i]) {
			deque.pop();
		}

		deque.push(i);

		if (i >= k - 1) {
			result.push(arr[deque[0]]);
		}

	}
	return result.join('\n');
}

fs.writeFileSync('output.txt', segmentMin(n, k, arr));
