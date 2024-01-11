import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const getToken = () => Cookies.get('authToken');

export const setToken = (token: string) => {
  Cookies.set('authToken', token, { expires: 7 }); // Expires in 7 days
};

export const removeToken = () => Cookies.remove('authToken');

export function getUserFromCookie() {
  const token = Cookies.get('authToken');
  const secretKey = process.env.SECRET_KEY || 'default_secret_key'; 

  if (token) {
    try {
      const decodedToken = jwt.verify(token, secretKey);
      return decodedToken;
    } catch (error) {
      // Token verification failed
      return null;
    }
  }

  return null;
}