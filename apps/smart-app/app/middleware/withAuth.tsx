import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getToken } from '../../utils/auth';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = getToken();      
      if (!token) {           
          router.push('/login')                 
      }
    }, []);

    // If no token, prevent rendering the wrapped component
    if (!getToken()) {
      return null;
    }
    
    // Render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;