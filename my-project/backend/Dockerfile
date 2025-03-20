FROM node:18-alpine

# Установка зависимостей для сборки
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1

# Переменные окружения для установки
ENV NODE_ENV=production

# Рабочая директория
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Экспозиция порта
EXPOSE 1337

# Создаем скрипт для запуска и автоматического создания администратора
RUN echo '#!/bin/sh \n\
if [ ! -f .strapi-started ]; then \n\
  echo "Первый запуск, создаю администратора..." \n\
  npm run build \n\
  node create-admin.js \n\
  touch .strapi-started \n\
fi \n\
npm run start' > /app/startup.sh && chmod +x /app/startup.sh

# Команда запуска
CMD ["/app/startup.sh"] 