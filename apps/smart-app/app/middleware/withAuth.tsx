import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getToken } from '../../utils/auth';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = getToken();

      // Redirect to login if no token found
      if (!token) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;