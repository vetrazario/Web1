FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Отключение телеметрии Next.js
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Сборка приложения
RUN npm run build

# Экспозиция порта
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"] 