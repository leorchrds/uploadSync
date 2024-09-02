import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [router]);

  if (loading) {
    return null;
  }

  return isAuthenticated;
};
