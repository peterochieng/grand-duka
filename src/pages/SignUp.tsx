import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Facebook,
  Github,
  Mail,
  Loader2,
  AlertCircle,
  ShoppingBag,
  Boxes,
  UserPlus,
  Users
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType]   = useState('retail');
  // Default userType depends on accountType; for retail we default to buyer, wholesale to trader.
  const [userType, setUserType] = useState('buyer');
  const [multiUserAccess, setMultiUserAccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            account_type: accountType,
            user_type: userType,
            multi_user_access: multiUserAccess,
          },
        },
      });

      if (error) {
        console.error('Sign-up error:', error);
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      console.log('Sign-up successful:', data);

      toast({
        title: 'Success',
        description: 'Your account has been created! Please complete KYC verification.',
      });
      // Redirect to KYC verification page
      navigate('/kyc-verification');
    } catch (error: any) {
      console.error('Unexpected error during sign-up:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle tab change: set account type and default user type accordingly.
  const handleTabChange = (value: string) => {
    setAccountType(value);
    if (value === 'wholesale') {
      setUserType('trader'); // default for wholesale
    } else {
      setUserType('buyer'); // default for retail
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 px-4 container mx-auto max-w-7xl min-h-[80vh] flex items-center justify-center">
        <motion.div
          className="w-full max-w-md px-8 py-10 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground text-sm">
              Start buying and selling on GrandDuka
            </p>
          </div>

          <Alert className="mb-6 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              After registration, you'll need to complete KYC verification to buy or sell items.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="retail" className="mb-6" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="retail">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Retail
              </TabsTrigger>
              <TabsTrigger value="wholesale">
                <Boxes className="mr-2 h-4 w-4" />
                Bulk Trading
              </TabsTrigger>
            </TabsList>

            <TabsContent value="retail" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Account Type</Label>
                  <RadioGroup 
                    value={userType}
                    className="mt-2"
                    onValueChange={setUserType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buyer" id="retail-buyer" />
                      <Label htmlFor="retail-buyer">Buyer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seller" id="retail-seller" />
                      <Label htmlFor="retail-seller">Seller (Individual)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shop-owner" id="retail-shop" />
                      <Label htmlFor="retail-shop">Shop Owner</Label>
                    </div>
                  </RadioGroup>
                </div>

                {userType === 'shop-owner' && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <div className="flex items-start mb-2">
                      <Users className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-700 dark:text-blue-300">Multi-User Access</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                          As a shop owner, you can add employees to help manage your inventory.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="multi-user"
                        checked={multiUserAccess}
                        onCheckedChange={(checked) => setMultiUserAccess(checked as boolean)}
                      />
                      <Label htmlFor="multi-user">Enable employee access management</Label>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="wholesale" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Account Type</Label>
                  {/* Wholesale defaults to "trader", but user can change */}
                  <RadioGroup 
                    value={userType}
                    className="mt-2"
                    onValueChange={setUserType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="trader" id="wholesale-trader" />
                      <Label htmlFor="wholesale-trader">Trader</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="broker" id="wholesale-broker" />
                      <Label htmlFor="wholesale-broker">Broker</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="producer" id="wholesale-producer" />
                      <Label htmlFor="wholesale-producer">Producer</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <div className="flex items-start mb-2">
                    <UserPlus className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-700 dark:text-blue-300">Team Access</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                        Allow multiple team members to access your inventory hub.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="team-access"
                      checked={multiUserAccess}
                      onCheckedChange={(checked) => setMultiUserAccess(checked as boolean)}
                    />
                    <Label htmlFor="team-access">Enable team access management</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                At least 8 characters with letters, numbers & symbols
              </p>
            </div>

            <div className="flex items-start">
              <Checkbox id="terms" className="mt-1" />
              <Label htmlFor="terms" className="ml-2 text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button variant="outline" type="button">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" type="button">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" type="button">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default SignUp;