async function fetchFromApi(endpoint, options = {}) {
  const url = `https://664cbe8dede9a2b55651708b.mockapi.io/api/v1/${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Default settings if none are provided
  const settings = {
    method: 'GET', // default method
    headers: { ...defaultHeaders, ...options.headers }, // merge default headers with options.headers
    ...options, // spread the rest of the options
  };

  if (options.body) settings.body = JSON.stringify(options.body);

  const response = await fetch(url, settings);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default fetchFromApi;