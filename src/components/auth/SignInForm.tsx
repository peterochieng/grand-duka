
import React from 'react';
import { EmailField } from './form-sections/EmailField';
import { PasswordField } from './form-sections/PasswordField';
import { RetailOptions } from './form-sections/RetailOptions';
import { WholesaleOptions } from './form-sections/WholesaleOptions';
import { SubmitButton } from './form-sections/SubmitButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SocialAuthButtons } from './SocialAuthButtons';
import { useSignInForm } from '@/hooks/useSignInForm';
import { Link } from 'react-router-dom';

interface SignInFormProps {
  loginType: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const SignInForm = ({ loginType, isLoading, setIsLoading }: SignInFormProps) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isShopEmployee,
    setIsShopEmployee,
    isTraderTeam,
    setIsTraderTeam,
    shopId,
    setShopId,
    traderId,
    setTraderId,
    handleSubmit
  } = useSignInForm({ loginType, isLoading, setIsLoading });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <EmailField 
        email={email}
        setEmail={setEmail}
      />
      
      <PasswordField 
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      
      {loginType === 'retail' && (
        <RetailOptions
          isShopEmployee={isShopEmployee}
          setIsShopEmployee={setIsShopEmployee}
          shopId={shopId}
          setShopId={setShopId}
        />
      )}
      
      {loginType === 'wholesale' && (
        <WholesaleOptions
          isTraderTeam={isTraderTeam}
          setIsTraderTeam={setIsTraderTeam}
          traderId={traderId}
          setTraderId={setTraderId}
        />
      )}
      
      <div className="flex items-center">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="ml-2 text-sm">
          Remember me
        </Label>
      </div>
      
      <SubmitButton isLoading={isLoading} />

      <SocialAuthButtons />

      <p className="mt-6 text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
                <p className="mt-6 text-center text-sm text-muted-foreground">
            An Admin ?{' '}
            <Link to="/admin/signin" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
    </form>
  );
};
