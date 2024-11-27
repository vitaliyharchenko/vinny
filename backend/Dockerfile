# Базовый образ с Python 3.10
FROM python:3.10-slim

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Создаем рабочую директорию
WORKDIR /app

# Устанавливаем pipenv
RUN pip install --upgrade pip
RUN pip install pipenv

# Копируем файлы зависимостей
COPY requirements.txt /app/

# Устанавливаем зависимости Python
RUN pip install --no-cache-dir -r requirements.txt

# Копируем код приложения
COPY . /app/

# Открываем порт для приложения
EXPOSE 8000

# Команда для запуска приложения
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]