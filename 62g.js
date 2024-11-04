function maxLengthUnderRudeness(n, c, s) {
	let left = 0;
	let rudeness = 0;
	let aCount = 0;
	let maxLength = 0;

	for (let right = 0; right < n; right++) {
		if (s[right] === 'a') {
			aCount++;
		} else if (s[right] === 'b') {
			rudeness += aCount;
		}

		while (rudeness > c) {
			if (s[left] === 'a') {
				aCount--;
			} else if (s[left] === 'b') {
				rudeness -= aCount;
			}
			left++;
		}

		maxLength = Math.max(maxLength, right - left + 1);
	}

	return maxLength;
}

// Пример использования
const n = 6;
const c = 2;
const s = "aabcbb";
console.log(maxLengthUnderRudeness(n, c, s)); // Вывод: 4
