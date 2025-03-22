
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/use-chatbot-api';

type ChatMessageProps = {
  message: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={cn(
      "w-full max-w-[85%] mb-4",
      isUser ? "ml-auto" : "mr-auto"
    )}>
      <div className={cn(
        isUser ? "message-bubble-user" : "message-bubble-assistant"
      )}>
        <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
      </div>
      <p className={cn(
        "text-xs text-muted-foreground mt-1",
        isUser ? "text-right" : "text-left"
      )}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  );
};

export default ChatMessage;
