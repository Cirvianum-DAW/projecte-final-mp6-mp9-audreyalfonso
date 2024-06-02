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

  // const response = await fetch(url, settings);

  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  //   // throw new Error(`HTTP error! status: ${response.status}`);
  // }

  // return response.json();

  try {
    const response = await fetch(url, settings);

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorDetails.message}`);
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error: ', error);
    throw error; // Re-throw the error after logging it
  }
}

export default fetchFromApi;