def count_pairs(n, k, arr):
    arr.sort()  # Сортируем массив
    max_count = 0
    left = 0

    for right in range(n):
        while arr[right] - arr[left] > k:
            left += 1
        max_count = max(max_count, right - left + 1)

    return max_count

def main():
    # Чтение данных из файла
    with open('input.txt', 'r') as file:
        first_line = file.readline().strip()
        n, k = map(int, first_line.split())
        arr = list(map(int, file.readline().strip().split()))

    result = count_pairs(n, k, arr)

    # Запись результата в файл
    with open('output.txt', 'w') as file:
        file.write(str(result) + '\n')

if __name__ == "__main__":
    main()
