const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const countSubarraysWithSumK = () => {
	const lines = fileContent.toString().split('\n');
	if (lines.length > 0) {

		const n = Number(lines[0].split(' ')[0]);
		const k = Number(lines[0].split(' ')[1]);
		const cars = lines[1].split(' ').map(Number);

		let count = 0;
		let currentSum = 0;
		const sumCount = new Map();
		sumCount.set(0, 1);

		for (let i = 0; i < n; i++) {
			currentSum += cars[i];
			count += sumCount.get(currentSum - k) || 0;
			sumCount.set(currentSum, (sumCount.get(currentSum) || 0) + 1);
		}

		return count;

	}
	return 'Не удалось прочитать файл.';
};

fs.writeFileSync('output.txt', countSubarraysWithSumK().toString());