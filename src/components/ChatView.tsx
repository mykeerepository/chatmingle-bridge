import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatViewProps {
  userId: string | null;
  isVisible: boolean;
  onClose?: () => void;
}

const users = {
  "1": {
    username: "Eva Summer",
    avatar: "/lovable-uploads/112d170e-c26f-4e86-a4cc-01f48bdd3883.png",
    status: "Active now",
  },
  "2": {
    username: "Alex Winter",
    avatar: "",
    status: "Offline",
  },
  "3": {
    username: "Sam Spring",
    avatar: "",
    status: "Active now",
  },
};

const getGradientBackground = (userId: string) => {
  const gradients = [
    "linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)",
    "linear-gradient(135deg, #D946EF 0%, #8B5CF6 100%)",
    "linear-gradient(135deg, #6E59A5 0%, #E5DEFF 100%)",
  ];
  return gradients[parseInt(userId) % gradients.length];
};

export function ChatView({ userId, isVisible, onClose }: ChatViewProps) {
  const isMobile = useIsMobile();

  if (!userId) {
    return (
      <div className={cn(
        "h-full flex items-center justify-center bg-chat-light",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-x-0" : "translate-x-full"
      )}>
        <p className="text-gray-500">Select a conversation to start messaging</p>
      </div>
    );
  }

  const userDetails = users[userId as keyof typeof users];

  return (
    <div className={cn(
      "h-full flex flex-col bg-chat-light",
      "transition-transform duration-300 ease-in-out",
      isVisible ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="flex items-center gap-4 p-4 border-b bg-white">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={onClose}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="h-12 w-12">
          <AvatarImage src={userDetails.avatar} alt={userDetails.username} />
          <AvatarFallback 
            style={{ 
              background: getGradientBackground(userId),
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            {userDetails.username[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{userDetails.username}</h2>
          <p className="text-sm text-gray-500">{userDetails.status}</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Message thread will go here */}
      </div>
    </div>
  );
}