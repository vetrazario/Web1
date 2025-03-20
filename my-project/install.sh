#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода информации
info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

# Функция для вывода предупреждений
warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

# Проверяем, запущен ли скрипт от имени root
if [ "$EUID" -ne 0 ]; then
  warn "Для установки необходимы права root."
  echo "Пожалуйста, запустите скрипт с sudo:"
  echo "sudo ./install.sh"
  exit 1
fi

# Путь к текущему каталогу
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
cd "$SCRIPT_DIR" || exit 1

# 1. Обновление системы
info "Обновление системных пакетов..."
apt update && apt upgrade -y

# 2. Установка необходимых зависимостей
info "Установка необходимых зависимостей..."
apt install -y apt-transport-https ca-certificates curl software-properties-common gnupg

# 3. Установка Docker
info "Установка Docker..."
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  rm get-docker.sh
  usermod -aG docker "$SUDO_USER"
  info "Docker установлен успешно!"
else
  info "Docker уже установлен."
fi

# 4. Установка Docker Compose
info "Установка Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
  curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  info "Docker Compose установлен успешно!"
else
  info "Docker Compose уже установлен."
fi

# 5. Создание .env файла, если он не существует
if [ ! -f .env ]; then
  info "Создание файла конфигурации .env..."
  cp .env.example .env
  
  # Генерация случайных ключей для безопасности
  JWT_SECRET=$(openssl rand -base64 32)
  ADMIN_JWT_SECRET=$(openssl rand -base64 32)
  API_TOKEN_SALT=$(openssl rand -base64 32)
  
  # Замена значений в файле .env
  sed -i "s/generate-a-jwt-secret-key-here/$JWT_SECRET/g" .env
  sed -i "s/generate-a-jwt-admin-secret-key-here/$ADMIN_JWT_SECRET/g" .env
  sed -i "s/generate-a-salt-key-here/$API_TOKEN_SALT/g" .env
  
  # Запрос данных администратора
  echo ""
  echo "Создание учетной записи администратора:"
  read -p "Email (по умолчанию admin@example.com): " ADMIN_EMAIL
  ADMIN_EMAIL=${ADMIN_EMAIL:-admin@example.com}
  read -sp "Пароль (по умолчанию Admin123!): " ADMIN_PASSWORD
  echo ""
  ADMIN_PASSWORD=${ADMIN_PASSWORD:-Admin123!}
  read -p "Имя (по умолчанию Admin): " ADMIN_FIRSTNAME
  ADMIN_FIRSTNAME=${ADMIN_FIRSTNAME:-Admin}
  read -p "Фамилия (по умолчанию User): " ADMIN_LASTNAME
  ADMIN_LASTNAME=${ADMIN_LASTNAME:-User}
  
  # Обновление файла .env с данными администратора
  sed -i "s/your-email@example.com/$ADMIN_EMAIL/g" .env
  sed -i "s/YourStrongPassword123!/$ADMIN_PASSWORD/g" .env
  sed -i "s/Admin/$ADMIN_FIRSTNAME/g" .env
  sed -i "s/User/$ADMIN_LASTNAME/g" .env
  
  info "Файл .env создан и настроен!"
else
  info ".env файл уже существует, пропускаем создание."
fi

# 6. Запуск контейнеров
info "Запуск Docker контейнеров..."
docker-compose down --remove-orphans
docker-compose up -d --build

# 7. Проверка запуска
info "Ожидание запуска сервисов..."
sleep 10

# Проверяем, что контейнеры запущены
if [ "$(docker-compose ps -q | wc -l)" -eq 3 ]; then
  info "Все сервисы успешно запущены!"
  
  # Получаем IP-адрес сервера
  SERVER_IP=$(hostname -I | awk '{print $1}')
  
  echo ""
  echo "==================================================================="
  echo "               Установка успешно завершена!                        "
  echo "==================================================================="
  echo ""
  echo "Ваше приложение доступно по следующим адресам:"
  echo ""
  echo "Frontend: http://$SERVER_IP:3000"
  echo "Backend (админ-панель): http://$SERVER_IP:1337/admin"
  echo ""
  echo "Данные для входа в админ-панель Strapi:"
  echo "Email: $ADMIN_EMAIL"
  echo "Пароль: $ADMIN_PASSWORD"
  echo ""
  echo "==================================================================="
else
  warn "Не все контейнеры запустились успешно."
  echo "Пожалуйста, проверьте логи командой:"
  echo "docker-compose logs"
fi

# Возвращаем пользователю права на каталог
if [ -n "$SUDO_USER" ]; then
  info "Возвращаем права на файлы..."
  chown -R "$SUDO_USER":"$SUDO_USER" .
fi

info "Установка завершена!" 