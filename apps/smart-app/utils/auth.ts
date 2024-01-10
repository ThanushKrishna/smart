import Cookies from 'js-cookie';

export const getToken = () => Cookies.get('authToken');

export const setToken = (token: string) => {
  Cookies.set('authToken', token, { expires: 7 }); // Expires in 7 days
};

export const removeToken = () => Cookies.remove('authToken');