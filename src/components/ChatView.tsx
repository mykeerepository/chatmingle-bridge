import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatViewProps {
  userId: string | null;
  isVisible: boolean;
}

const userDetails = {
  id: "1",
  username: "Eva Summer",
  avatar: "/lovable-uploads/112d170e-c26f-4e86-a4cc-01f48bdd3883.png",
  status: "Active now",
};

export function ChatView({ userId, isVisible }: ChatViewProps) {
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

  return (
    <div className={cn(
      "h-full flex flex-col bg-chat-light",
      "transition-transform duration-300 ease-in-out",
      isVisible ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="flex items-center gap-4 p-4 border-b bg-white">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userDetails.avatar} alt={userDetails.username} />
          <AvatarFallback>{userDetails.username[0]}</AvatarFallback>
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