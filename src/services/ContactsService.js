import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  listContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?orderBy=${orderBy}`, {
    });
  }

  createContact(contact) {
    return this.HttpClient.post('/contacts', { body: contact });
  }

  getContactById(id) {
    return this.HttpClient.get(`/contacts/${id}`, {
    });
  }
}

export default new ContactsService();
