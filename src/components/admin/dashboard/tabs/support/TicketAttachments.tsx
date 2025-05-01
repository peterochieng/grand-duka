
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Attachment {
  id: string;
  filename: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  size?: string;
}

interface TicketAttachmentsProps {
  attachments?: Attachment[];
  onAddAttachment: (attachment: Attachment) => void;
  onRemoveAttachment: (attachmentId: string) => void;
}

export const TicketAttachments: React.FC<TicketAttachmentsProps> = ({ 
  attachments, 
  onAddAttachment, 
  onRemoveAttachment 
}) => {
  const [newAttachment, setNewAttachment] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewAttachment(e.target.files[0]);
    }
  };

  const handleAttachmentUpload = () => {
    if (!newAttachment) return;
    
    // Create a new attachment object
    const newAttachmentObj = {
      id: `attach-${Date.now()}`,
      filename: newAttachment.name,
      url: URL.createObjectURL(newAttachment),
      uploadedBy: "Current Support Agent",
      uploadedAt: new Date().toISOString(),
      size: formatFileSize(newAttachment.size)
    };

    onAddAttachment(newAttachmentObj);
    setNewAttachment(null);
    
    toast({
      title: "Attachment uploaded",
      description: `${newAttachment.name} has been attached to the ticket`
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">Attachments</h4>
        <div className="flex items-center gap-2">
          <Input 
            type="file" 
            id="ticket-attachment" 
            className="w-auto max-w-xs" 
            onChange={handleFileChange} 
          />
          <Button 
            size="sm" 
            onClick={handleAttachmentUpload}
            disabled={!newAttachment}
          >
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </Button>
        </div>
      </div>
      
      {(!attachments || attachments.length === 0) ? (
        <p className="text-sm text-muted-foreground">No attachments for this ticket.</p>
      ) : (
        <div className="space-y-2 mt-3">
          {attachments.map(attachment => (
            <div key={attachment.id} className="flex items-center justify-between p-2 border rounded-md bg-muted/40">
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                <span className="font-medium text-sm">{attachment.filename}</span>
                {attachment.size && <span className="text-xs text-muted-foreground">({attachment.size})</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Added by {attachment.uploadedBy} on {new Date(attachment.uploadedAt).toLocaleDateString()}
                </span>
                <a 
                  href={attachment.url} 
                  download={attachment.filename}
                  className="text-primary hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0" 
                  onClick={() => onRemoveAttachment(attachment.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
