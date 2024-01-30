import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export const getToken = () => Cookies.get('authToken');

export const setToken = (token: string) => {
  Cookies.set('authToken', token, { expires: 7 }); // Expires in 7 days
};

export const removeToken = () => Cookies.remove('authToken');

export function getUserFromCookie() {
  
  const token = getToken();
  const secretKey = process.env.SECRET_KEY || 'default_secret_key';
  // console.log("TOKEN: " + token);
  // console.log("SECRETKEY: " + secretKey);

  if (token && secretKey) {
    try {
      const decoded = jwt.decode(token);
      //const decoded = jwt.verify(token, secretKey);      
      return decoded;
    } catch (error) {      
      return null;
    }
  } else {
    console.error('Token or secretKey is missing.');
    return null;
  }
}