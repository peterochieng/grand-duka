
import { useState } from 'react';

export const useAuthState = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword
  };
};
