const fs = require('fs');

let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.trim().split('\n');
const [n, b] = lines[0].split(' ').map(BigInt);
const arrivals = lines[1].split(' ').map(BigInt);

function calculateTotalWaitTime() {
	let totalWaitTime = BigInt(0);
	let queue = BigInt(0);

	for (let i = 0; i < n; i++) {
		queue += arrivals[i];
		totalWaitTime += queue;
		queue = BigInt(Math.max(0, Number(queue - b)));
	}

	if (queue > 0) {
		totalWaitTime += queue;
	}

	return totalWaitTime.toString();
}

fs.writeFileSync('output.txt', calculateTotalWaitTime());
