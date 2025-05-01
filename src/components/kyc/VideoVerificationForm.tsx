
import React, { useState } from 'react';
import { Check, Video, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface VideoVerificationFormProps {
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
  verificationCode: string;
}

const VideoVerificationForm = ({ 
  onSubmit, 
  onBack, 
  isLoading, 
  verificationCode 
}: VideoVerificationFormProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="verification-code">Your Verification Code</Label>
        <div className="bg-primary/10 text-primary font-mono text-3xl text-center p-3 rounded-md">
          {verificationCode}
        </div>
        <p className="text-sm text-muted-foreground">
          Please record a short video holding your ID and reading this code aloud.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="video">Upload or record verification video</Label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
          {videoFile ? (
            <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
              <Check className="h-5 w-5" />
              <span>{videoFile.name}</span>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setVideoFile(null)}
              >
                Change
              </Button>
            </div>
          ) : (
            <>
              <Video className="h-10 w-10 mx-auto mb-2 text-gray-400" />
              <Label htmlFor="video-input" className="cursor-pointer">
                <span className="text-primary">Click to upload</span> or record
              </Label>
              <Input
                id="video-input"
                type="file"
                accept="video/*"
                capture="user"
                className="hidden"
                onChange={handleVideoFileChange}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Max size: 50MB
              </p>
            </>
          )}
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Complete Verification'
          )}
        </Button>
      </div>
    </form>
  );
};

export default VideoVerificationForm;
