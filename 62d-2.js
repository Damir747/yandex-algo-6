const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const countPairs = () => {
	const lines = fileContent.toString().split('\n');
	if (lines.length > 0) {

		const n = Number(lines[0].split(' ')[0]);
		const k = Number(lines[0].split(' ')[1]);
		const arr = lines[1].split(' ').map(Number);

		let max = 0;
		arr.sort((a, b) => a - b);

		let left = 0;
		while (left < arr.length) {
			let right = left + 1;
			while (right < arr.length && arr[right] - arr[left] <= k) {
				right++;
			}
			max = Math.max(max, right - left);
			left++;
		}
		return max;
	}
	return 'Не удалось прочитать файл.';
};

fs.writeFileSync('output.txt', countPairs().toString());