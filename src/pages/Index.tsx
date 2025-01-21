import { useState } from "react";
import { ChatList } from "@/components/ChatList";
import { ChatView } from "@/components/ChatView";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Index() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [showChat, setShowChat] = useState(false);

  const handleSelectChat = (userId: string) => {
    setSelectedUserId(userId);
    if (isMobile) {
      setShowChat(true);
    }
  };

  return (
    <div className="h-screen flex bg-white">
      <div className={cn(
        "h-full",
        isMobile ? (showChat ? "hidden" : "w-full") : "w-[380px]",
        "border-r"
      )}>
        <ChatList onSelectChat={handleSelectChat} selectedUserId={selectedUserId} />
      </div>
      <div className={cn(
        "h-full",
        isMobile ? (showChat ? "w-full" : "hidden") : "flex-1"
      )}>
        <ChatView userId={selectedUserId} isVisible={isMobile ? showChat : true} />
      </div>
    </div>
  );
}