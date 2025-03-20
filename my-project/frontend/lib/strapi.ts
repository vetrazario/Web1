import axios from 'axios';

/**
 * Базовый URL Strapi API
 */
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Axios-клиент для Strapi API
 */
const strapiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Утилиты для взаимодействия со Strapi API
 */
export const strapiApi = {
  /**
   * Получение контента из Strapi API
   * @param endpoint - API-эндпоинт
   * @param query - Параметры запроса
   * @returns Результат запроса
   */
  async get<T>(endpoint: string, query: object = {}): Promise<T> {
    try {
      const queryString = new URLSearchParams(query as Record<string, string>).toString();
      const url = `${endpoint}${queryString ? `?${queryString}` : ''}`;
      const { data } = await strapiClient.get<T>(url);
      return data;
    } catch (error) {
      console.error('Error fetching from Strapi:', error);
      throw error;
    }
  },

  /**
   * Получить полный URL для медиа-файла
   * @param path - Путь к медиа-файлу
   * @returns Полный URL медиа-файла
   */
  getMediaUrl(path: string | null): string {
    if (!path) return '';
    // Если путь абсолютный, возвращаем как есть
    if (path.startsWith('http')) {
      return path;
    }
    // Иначе соединяем с базовым URL
    return `${API_URL}${path}`;
  },
};

export default strapiApi; 