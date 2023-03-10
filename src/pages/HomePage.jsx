import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todo');
    } else {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);
};

export default HomePage;
