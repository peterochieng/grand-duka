
import { useAuthState } from './auth/useAuthState';
import { useRetailAuth } from './auth/useRetailAuth';
import { useWholesaleAuth } from './auth/useWholesaleAuth';
import { useAuthSubmit } from './auth/useAuthSubmit';

interface UseSignInFormProps {
  loginType: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useSignInForm = ({ loginType, isLoading, setIsLoading }: UseSignInFormProps) => {
  // Get auth state (email, password, showPassword)
  const authState = useAuthState();
  
  // Get retail-specific state (isShopEmployee, shopId)
  const retailAuth = useRetailAuth();
  
  // Get wholesale-specific state (isTraderTeam, traderId)
  const wholesaleAuth = useWholesaleAuth();
  
  // Get submit handler
  const { handleSubmit } = useAuthSubmit({
    email: authState.email,
    password: authState.password,
    loginType,
    isShopEmployee: retailAuth.isShopEmployee,
    shopId: retailAuth.shopId,
    isTraderTeam: wholesaleAuth.isTraderTeam,
    traderId: wholesaleAuth.traderId,
    setIsLoading
  });

  // Return all state and handlers
  return {
    ...authState,
    ...retailAuth,
    ...wholesaleAuth,
    handleSubmit
  };
};
