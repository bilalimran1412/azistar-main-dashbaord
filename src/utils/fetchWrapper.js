export const fetchWrapper = async ({
  url,
  method = 'GET',
  useCredentials = false,
  body = null,
  headers = {},
}) => {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem('token');

  try {
    const fullUrl = `${baseURL}${url}`;
    const options = {
      method,
      headers: {
        ...(body instanceof FormData
          ? {}
          : { 'Content-Type': 'application/json' }),
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body:
        body instanceof FormData ? body : body ? JSON.stringify(body) : null,
    };

    if (useCredentials) {
      options.credentials = 'include';
    }

    const response = await fetch(fullUrl, options);

    if (!response.ok) {
      const errorBody = await response.json();
      // eslint-disable-next-line no-throw-literal
      throw {
        status: response.status,
        message: errorBody.message || 'An error occurred',
        body: errorBody,
      };
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: 500,
        message: error.message,
        body: {},
      };
    }

    throw error;
  }
};
