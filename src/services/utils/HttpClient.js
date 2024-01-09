import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);

    await delay(500);
    // parsear o body
    // Poderia usar response.json().then ao invés de async await.
    return response.json();
  }
}

export default HttpClient;
