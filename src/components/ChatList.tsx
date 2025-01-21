import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isOnline: boolean;
}

interface ChatListProps {
  onSelectChat: (userId: string) => void;
  selectedUserId: string | null;
}

const messages: Message[] = [
  {
    id: "1",
    userId: "1",
    username: "Eva Summer",
    avatar: "/lovable-uploads/112d170e-c26f-4e86-a4cc-01f48bdd3883.png",
    lastMessage: "The nature here is fantastic!!",
    timestamp: "11:28 PM",
    isOnline: true,
  },
  {
    id: "2",
    userId: "2",
    username: "Alex Winter",
    avatar: "/placeholder.svg",
    lastMessage: "Hey, how's it going?",
    timestamp: "10:15 PM",
    isOnline: false,
  },
  {
    id: "3",
    userId: "3",
    username: "Sam Spring",
    avatar: "/placeholder.svg",
    lastMessage: "See you tomorrow!",
    timestamp: "9:45 PM",
    isOnline: true,
  },
];

export function ChatList({ onSelectChat, selectedUserId }: ChatListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 p-4 cursor-pointer transition-colors duration-200",
              "hover:bg-chat-hover",
              selectedUserId === message.userId ? "bg-chat-active" : "bg-chat-light"
            )}
            onClick={() => onSelectChat(message.userId)}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={message.avatar} alt={message.username} />
                <AvatarFallback>{message.username[0]}</AvatarFallback>
              </Avatar>
              {message.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium truncate">{message.username}</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {message.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}