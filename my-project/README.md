# Универсальный веб-проект Next.js + Strapi

Готовый к использованию веб-проект с современным стеком технологий:

- **Frontend**: Next.js с App Router, TypeScript и Tailwind CSS
- **Backend**: Strapi CMS
- **База данных**: PostgreSQL
- **Инфраструктура**: Docker и Docker Compose

## Быстрая установка на Ubuntu (1 команда!)

Просто выполните одну команду для полностью автоматической установки:

```bash
wget -qO- https://raw.githubusercontent.com/your-username/my-project/main/install.sh | sudo bash
```

Или, если вы уже скачали репозиторий:

```bash
cd my-project
sudo ./install.sh
```

## Ручная установка на Ubuntu

Если вы предпочитаете пошаговую установку, следуйте этим инструкциям:

### 1. Подготовка сервера

```bash
# Обновление пакетов
sudo apt update
sudo apt upgrade -y

# Установка необходимых зависимостей
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Добавление текущего пользователя в группу docker
sudo usermod -aG docker ${USER}
```

Важно: выйдите из системы и войдите снова, чтобы применить изменения группы.

### 2. Клонирование и запуск проекта

```bash
# Клонирование проекта
git clone <URL_репозитория> my-project
cd my-project

# Настройка переменных окружения
cp .env.example .env
nano .env  # Отредактируйте переменные по необходимости

# Запуск проекта
docker-compose up -d
```

### 3. Доступ к приложению

После завершения установки:

- **Frontend**: http://ваш_IP:3000
- **Backend (админка)**: http://ваш_IP:1337/admin

## Структура проекта

```
my-project/
├── frontend/           # Next.js приложение
├── backend/            # Strapi CMS
├── docker-compose.yml  # Конфигурация Docker Compose
├── .env                # Переменные окружения
├── install.sh          # Скрипт автоматической установки
└── README.md           # Эта документация
```

## Управление проектом

### Запуск и остановка

```bash
# Запуск проекта
docker-compose up -d

# Остановка проекта
docker-compose down

# Просмотр логов
docker-compose logs -f
```

### Обновление

```bash
# Обновление проекта
git pull
docker-compose down
docker-compose up -d --build
```

## Резервное копирование

### Экспорт базы данных

```bash
docker-compose exec postgres pg_dump -U strapi strapi > backup.sql
```

### Резервное копирование загруженных файлов

```bash
docker-compose exec backend tar -czf /app/backup-uploads.tar.gz /app/public/uploads
docker cp $(docker-compose ps -q backend):/app/backup-uploads.tar.gz ./backup-uploads.tar.gz
```

## Требования к серверу

- Ubuntu 20.04 или новее
- Минимум 2 GB RAM
- Минимум 20 GB свободного места на диске
- Открытые порты 80, 443 (для HTTPS) и 3000, 1337 (для разработки)

## Разработка

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

### Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

## Дополнительная информация

- [Документация Next.js](https://nextjs.org/docs)
- [Документация Strapi](https://docs.strapi.io)
- [Документация Tailwind CSS](https://tailwindcss.com/docs)
- [Документация Docker](https://docs.docker.com/) 