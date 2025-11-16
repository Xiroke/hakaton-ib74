# Используем официальный образ Python 3.11
FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем системные зависимости, включая Nmap и Go для Nuclei
RUN apt-get update && apt-get install -y --no-install-recommends \
    nmap \
    git \
    golang \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем Nuclei
RUN go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest && \
    mv /root/go/bin/nuclei /usr/local/bin/

# Обновляем шаблоны Nuclei
RUN nuclei -update-templates

# Устанавливаем Exploit-DB (searchsploit) из нового репозитория
RUN git clone https://gitlab.com/exploit-database/exploitdb.git /opt/exploitdb && \
    ln -sf /opt/exploitdb/searchsploit /usr/local/bin/searchsploit
# Копируем и устанавливаем зависимости Python
# Предполагается, что requirements.txt лежит в корне папки backend
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходный код приложения
COPY . .

# Команда для запуска, адаптированная из вашей
CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--reload-exclude", "*/exploits_templates/*", "--reload-exclude", "*/exploits/*"]