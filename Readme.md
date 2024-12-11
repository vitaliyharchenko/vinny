# Настройка рабочего места

install Docker
install https://brew.sh/

# Установка пакетов

brew install git  
brew install python3  
brew install node

# Подготовка docker контейнеров к работе

cd frontend
npm install

# Развертывание контейнеров

docker-compose up --build

# После развертывания контейнеров

docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py collectstatic
docker-compose exec backend bash

# Доступ к приложению

http://localhost:3000/ - фронтенд
http://localhost:8000/admin/ - админка django
http://localhost:8000/graph/ - граф через API
http://0.0.0.0:8000 - доступ через nginx (если он подключен в docker-compose для продакшна)

# Полезные команды

manage.py dumpdata --exclude auth.permission --exclude contenttypes > fixture.json - создание фикстур

manage.py loaddata fixture.json - загрузка фикстур
