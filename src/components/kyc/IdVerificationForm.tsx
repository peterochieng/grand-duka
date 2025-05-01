
import React, { useState } from 'react';
import { CreditCard, File, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface IdVerificationFormProps {
  onSubmit: () => void;
  isLoading: boolean;
}

const IdVerificationForm = ({ onSubmit, isLoading }: IdVerificationFormProps) => {
  const [frontIdFile, setFrontIdFile] = useState<File | null>(null);
  const [backIdFile, setBackIdFile] = useState<File | null>(null);

  const handleFrontIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFrontIdFile(e.target.files[0]);
    }
  };

  const handleBackIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackIdFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-primary/5 rounded-md p-4 text-sm space-y-2">
        <h3 className="font-medium flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          Emirates ID Verification
        </h3>
        <p className="text-muted-foreground">
          Please upload clear images of the front and back sides of your Emirates ID.
          Make sure all details are clearly visible.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="front-id" className="block mb-2">Front Side of Emirates ID</Label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
            {frontIdFile ? (
              <div className="flex items-center justify-center space-x-2">
                <File className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span>{frontIdFile.name}</span>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setFrontIdFile(null)}
                >
                  Change
                </Button>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <Label htmlFor="front-id-input" className="cursor-pointer">
                  <span className="text-primary">Click to upload</span> or drag and drop
                </Label>
                <Input
                  id="front-id-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFrontIdChange}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG or JPEG (max. 5MB)
                </p>
              </>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="back-id" className="block mb-2">Back Side of Emirates ID</Label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
            {backIdFile ? (
              <div className="flex items-center justify-center space-x-2">
                <File className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span>{backIdFile.name}</span>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setBackIdFile(null)}
                >
                  Change
                </Button>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <Label htmlFor="back-id-input" className="cursor-pointer">
                  <span className="text-primary">Click to upload</span> or drag and drop
                </Label>
                <Input
                  id="back-id-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBackIdChange}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG or JPEG (max. 5MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading || !frontIdFile || !backIdFile}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Continue to Video Verification'
        )}
      </Button>
    </form>
  );
};

export default IdVerificationForm;
