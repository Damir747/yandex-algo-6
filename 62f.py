MOD = 1000000007

# Функция для нахождения модульного обратного числа
def mod_inverse(a, p):
    return pow(a, p - 2, p)

def main():
    # Чтение данных
    with open('input.txt', 'r') as file:
        n = int(file.readline().strip())
        arr = list(map(int, file.readline().strip().split()))

    S_total = 0
    S_squares = 0
    S_cubes = 0

    for num in arr:
        S_total = (S_total + num) % MOD
        S_squares = (S_squares + num * num) % MOD
        S_cubes = (S_cubes + num * num * num) % MOD

    # Используем формулу для подсчета суммы произведений
    totalSum = (S_total * S_total % MOD * S_total % MOD - 3 * S_total % MOD * S_squares % MOD + 2 * S_cubes % MOD) % MOD

    # Корректируем, чтобы избежать отрицательного значения
    if totalSum < 0:
        totalSum += MOD

    # Подсчитываем общее количество тройных произведений
    inv6 = mod_inverse(6, MOD)
    result = (totalSum * inv6) % MOD

    # Запись результата в файл
    with open('output.txt', 'w') as file:
        file.write(str(result) + '\n')

if __name__ == "__main__":
    main()
