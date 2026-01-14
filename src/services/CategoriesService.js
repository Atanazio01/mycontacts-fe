import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories(signal) {
    const categories = await this.HttpClient.get('/categories', { signal });

    return categories.map(CategoryMapper.toDomain);
  }

  async getCategoryById(id) {
    const category = await this.HttpClient.get(`/categories/${id}`);

    return CategoryMapper.toDomain(category);
  }

  async createCategory(name) {
    const categoryData = CategoryMapper.toPersistence({ name });

    return this.HttpClient.post('/categories', { body: categoryData });
  }

  async updateCategory(id, name) {
    const categoryData = CategoryMapper.toPersistence({ name });

    return this.HttpClient.put(`/categories/${id}`, { body: categoryData });
  }

  deleteCategory(id) {
    return this.HttpClient.delete(`/categories/${id}`);
  }
}

const categoriesService = new CategoriesService();

export default categoriesService;
