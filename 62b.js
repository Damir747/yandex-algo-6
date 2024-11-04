function countSubarraysWithSumK(N, K, cars) {
	let count = 0;
	let currentSum = 0;
	let left = 0;

	for (let right = 0; right < N; right++) {
		currentSum += cars[right];

		while (currentSum > K && left <= right) {
			currentSum -= cars[left];
			left++;
		}

		// Check for subarrays that end at `right` and have sum equal to K
		if (currentSum === K) {
			let tempLeft = left;
			while (tempLeft <= right && currentSum === K) {
				count++;
				currentSum -= cars[tempLeft];
				tempLeft++;
			}
			// Restore the currentSum for further iterations
			for (let i = left; i < tempLeft; i++) {
				currentSum += cars[i];
			}
		}
	}

	return count;
}

// Пример использования
const N = 5;
const K = 17;
const cars = [17, 7, 10, 7, 10];

console.log(countSubarraysWithSumK(N, K, cars)); // Вывод: 4
