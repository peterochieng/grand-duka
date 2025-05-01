
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, PlayCircle, BookOpen, Eye } from "lucide-react";

interface UserGuideCardProps {
  title: string;
  description: string;
  type: "pdf" | "video" | "interactive";
  details: string;
  onAction: (guideName: string) => void;
  onRead?: (guideName: string) => void;
}

export const UserGuideCard = ({ 
  title, 
  description, 
  type, 
  details,
  onAction,
  onRead
}: UserGuideCardProps) => {
  let icon;
  let buttonText;
  let actionIcon;

  switch (type) {
    case "pdf":
      icon = <FileText className="h-4 w-4" />;
      buttonText = "Download Guide";
      actionIcon = <Download className="mr-2 h-4 w-4" />;
      break;
    case "video":
      icon = <PlayCircle className="h-4 w-4" />;
      buttonText = "Watch Video";
      actionIcon = <PlayCircle className="mr-2 h-4 w-4" />;
      break;
    case "interactive":
      icon = <BookOpen className="h-4 w-4" />;
      buttonText = "Open Guide";
      actionIcon = <BookOpen className="mr-2 h-4 w-4" />;
      break;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-sm">
          {icon}
          <span>{details}</span>
        </div>
      </CardContent>
      <CardFooter className={type === "pdf" && onRead ? "flex flex-col space-y-2" : ""}>
        {type === "pdf" && onRead && (
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => onRead(title)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Read Guide
          </Button>
        )}
        
        <Button 
          variant={type === "pdf" && onRead ? "outline" : "default"}
          className="w-full"
          onClick={() => onAction(title)}
        >
          {actionIcon}
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
