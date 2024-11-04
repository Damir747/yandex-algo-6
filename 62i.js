const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');
const lines = fileContent.trim().split('\n');

const n = parseInt(lines[0]);
const interests = lines[1].split(' ').map(Number);
const usefulnesses = lines[2].split(' ').map(Number);
const moods = lines[3].split(' ').map(Number);

function studyOrder(n, interests, usefulnesses, moods) {
	const algorithms = Array.from({ length: n }, (_, i) => ({
		index: i + 1,
		interest: interests[i],
		usefulness: usefulnesses[i]
	}));

	// Sort algorithms for both interest and usefulness in descending order
	const interestSorted = [...algorithms].sort((a, b) =>
		b.interest - a.interest || b.usefulness - a.usefulness || a.index - b.index
	);
	const usefulnessSorted = [...algorithms].sort((a, b) =>
		b.usefulness - a.usefulness || b.interest - a.interest || a.index - b.index
	);

	let interestPointer = 0;
	let usefulnessPointer = 0;
	const studied = Array(n).fill(false);
	const order = [];

	for (const mood of moods) {
		if (mood === 1) {
			// Select by usefulness
			while (studied[usefulnessSorted[usefulnessPointer].index - 1]) {
				usefulnessPointer++;
			}
			const algo = usefulnessSorted[usefulnessPointer];
			studied[algo.index - 1] = true;
			order.push(algo.index);
		} else {
			// Select by interest
			while (studied[interestSorted[interestPointer].index - 1]) {
				interestPointer++;
			}
			const algo = interestSorted[interestPointer];
			studied[algo.index - 1] = true;
			order.push(algo.index);
		}
	}

	return order.join(' ');
}

const result = studyOrder(n, interests, usefulnesses, moods);
fs.writeFileSync('output.txt', result);
