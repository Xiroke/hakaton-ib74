import argparse
import random
import time


def main():
    parser = argparse.ArgumentParser(description="Simple host/port scanner stub")
    parser.add_argument("-h", "--host", required=True, help="Target host")
    parser.add_argument("-p", "--port", required=True, type=int, help="Target port")

    args = parser.parse_args()

    print(f"Подключаюсь к {args.host}:{args.port} ...")
    time.sleep(1)

    print("Выполняю проверку…")
    time.sleep(1)

    cve_examples = [
        "[CVE-2023-12345] SQL Injection | Уязвимость в параметрах запроса | Критическая",
        "[CVE-2022-99999] XSS Attack | Неправильная фильтрация входа | Высокая",
        "[CVE-2021-11111] Open Redirect | Небезопасный редирект | Средняя",
        "[CVE-2020-00001] Info Leak | Утечка метаданных | Низкая",
    ]

    technical_logs = [
        "Проверка открытых портов…",
        "Отправка тестового payload…",
        "Анализ HTTP‑заголовков…",
        "Проверка политики CORS…",
        "Анализ cookies и флагов безопасности…",
        "Идет brute‑force попытка handshake…",
        "Сбор данных о версии сервера…",
        "Выполняю fingerprinting веб‑приложения…",
    ]

    progress_logs = [
        "Прогресс: 5%",
        "Прогресс: 12%",
        "Прогресс: 18%",
        "Прогресс: 27%",
        "Прогресс: 34%",
        "Прогресс: 42%",
        "Прогресс: 55%",
        "Прогресс: 63%",
        "Прогресс: 74%",
        "Прогресс: 88%",
        "Почти готово…",
    ]

    start = time.time()
    duration = 60  # 1 минута

    while time.time() - start < duration:
        r = random.randint(1, 10)

        if r <= 3:
            print(random.choice(cve_examples))
        elif r <= 7:
            print(random.choice(technical_logs))
        else:
            print(random.choice(progress_logs))

        time.sleep(1)

    print("Сканирование завершено")


if __name__ == "__main__":
    main()
