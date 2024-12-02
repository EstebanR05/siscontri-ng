
export const environment = {
  production: false,
  app: {
    apiBaseUrl: 'http://localhost:8080/',
  },
  auth: {
    JWT: localStorage.getItem('access_token'),
    userId: localStorage.getItem('userId')
  },
};

export const SERVER_URL = 'http://localhost:8080';