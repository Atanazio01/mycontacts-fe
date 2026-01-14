import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy, signal) {
    const contacts = await this.HttpClient.get(`/contacts?orderBy=${orderBy || 'asc'}`, { signal });

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.HttpClient.get(`/contacts/${id}`, { signal });

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

const contactsService = new ContactsService();

export default contactsService;
