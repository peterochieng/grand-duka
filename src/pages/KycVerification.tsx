
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from 'react-router-dom';
import IdVerificationForm from '@/components/kyc/IdVerificationForm';
import VideoVerificationForm from '@/components/kyc/VideoVerificationForm';
import VerificationSuccess from '@/components/kyc/VerificationSuccess';

const KycVerification = () => {
  const [activeStep, setActiveStep] = useState<'id' | 'video'>('id');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  // Generate a random verification code for demo purposes
  useEffect(() => {
    setVerificationCode(Math.floor(1000 + Math.random() * 9000).toString());
  }, []);

  const handleIdSubmit = () => {
    // In a real app, we would validate the files here
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'ID Verified',
        description: 'Your ID has been successfully uploaded. Please proceed to video verification.',
      });
      setActiveStep('video');
    }, 2000);
  };

  const handleVideoSubmit = () => {
    // In a real app, we would validate the video here
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Verification Complete',
        description: 'Your verification has been submitted successfully and is pending review.',
      });
      setIsVerified(true);
    }, 2000);
  };

  return (
    <>
      <Header />
      <main className="pt-24 px-4 container mx-auto max-w-7xl min-h-[80vh] flex items-center justify-center py-12">
        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link to="/profile">
                    <Button variant="ghost" size="icon" className="mr-2">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                  <div>
                    <CardTitle className="text-xl">KYC Verification</CardTitle>
                    <CardDescription>
                      Complete verification to unlock buying and selling
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${activeStep === 'id' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${activeStep === 'video' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {!isVerified ? (
                <>
                  {activeStep === 'id' ? (
                    <IdVerificationForm 
                      onSubmit={handleIdSubmit} 
                      isLoading={isLoading} 
                    />
                  ) : (
                    <VideoVerificationForm 
                      onSubmit={handleVideoSubmit}
                      onBack={() => setActiveStep('id')}
                      isLoading={isLoading}
                      verificationCode={verificationCode}
                    />
                  )}
                </>
              ) : (
                <VerificationSuccess />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default KycVerification;
