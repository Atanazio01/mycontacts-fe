import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    await delay(500);

    const response = await fetch(`${this.baseUrl}${path}`);

    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} - ${response.statusText}`);
    // parsear o body
    // Poderia usar response.json().then ao invés de async await.
  }
}

export default HttpClient;
