const fs = require('fs');
const path = require('path');

/**
 * Скрипт для автоматического создания администратора Strapi при первом запуске
 */
async function createAdmin() {
  console.log('Starting admin user creation...');
  
  try {
    // Проверяем, создан ли уже аккаунт администратора
    const userinfoPath = path.join('.tmp', 'admin-user-info.json');
    if (fs.existsSync(userinfoPath)) {
      console.log('Admin user already exists, skipping creation');
      return;
    }

    // Получаем переменные окружения
    const email = process.env.STRAPI_ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.STRAPI_ADMIN_PASSWORD || 'Admin123!';
    const firstname = process.env.STRAPI_ADMIN_FIRSTNAME || 'Admin';
    const lastname = process.env.STRAPI_ADMIN_LASTNAME || 'User';

    // Загружаем Strapi
    console.log('Loading Strapi...');
    const strapi = await require('@strapi/strapi').launch();
    
    // Создаем администратора
    console.log(`Creating admin user: ${email}...`);
    await strapi.admin.services.user.create({
      username: email,
      email,
      password,
      firstname,
      lastname,
      isActive: true,
      roles: [1], // Администратор
    });

    // Сохраняем информацию о созданном пользователе
    if (!fs.existsSync('.tmp')) {
      fs.mkdirSync('.tmp', { recursive: true });
    }
    fs.writeFileSync(
      userinfoPath,
      JSON.stringify({ email, firstname, lastname, created: new Date() }),
      'utf8'
    );

    console.log('Admin user created successfully!');
    
    // Останавливаем Strapi
    await strapi.destroy();
    console.log('Strapi stopped. Ready to start normally.');
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

// Запускаем функцию создания администратора
createAdmin(); 