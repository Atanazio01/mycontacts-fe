import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    const contacts = await this.HttpClient.get(`/contacts?orderBy=${orderBy}`);

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id) {
    const contact = await this.HttpClient.get(`/contacts/${id}`);

    return ContactMapper.toDomain(contact);
  }

  createContact(contact) {
    const contactData = ContactMapper.toPersistence(contact);

    return this.HttpClient.post('/contacts', { body: contactData });
  }

  updateContact(id, contact) {
    const contactData = ContactMapper.toPersistence(contact);

    return this.HttpClient.put(`/contacts/${id}`, { body: contactData });
  }

  deleteContact(id) {
    return this.HttpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
