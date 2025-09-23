import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    const categories = await this.HttpClient.get('/categories');

    return categories.map(CategoryMapper.toDomain);
  }

  async getCategoryById(id) {
    const category = await this.HttpClient.get(`/categories/${id}`);

    return CategoryMapper.toDomain(category);
  }

  async createCategory(name) {
    const category = await this.HttpClient.post('/categories', { body: { name } });

    return CategoryMapper.toDomain(category);
  }

  async updateCategory(id, name) {
    const category = await this.HttpClient.put(`/categories/${id}`, { body: { name } });

    return CategoryMapper.toDomain(category);
  }

  deleteCategory(id) {
    return this.HttpClient.delete(`/categories/${id}`);
  }
}

export default new CategoriesService();
