class APIError extends Error {
  constructor(response, body) {
    super();
    this.name = 'APIError';
    this.body = body;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}

export default APIError;
