
import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const { isAuthenticated } = useAuth();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full relative glass-panel rounded-2xl overflow-hidden",
        "transition-all duration-300 ease-in-out",
        isAuthenticated ? "opacity-100" : "opacity-70 pointer-events-none"
      )}
    >
      <div className="flex items-center p-2">
        <input
          type="text"
          placeholder={isAuthenticated ? "Ask something..." : "Please log in to use the chatbot"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={cn(
            "w-full px-4 py-3 bg-transparent focus:outline-none",
            "placeholder:text-muted-foreground/60",
            "text-foreground"
          )}
          disabled={!isAuthenticated || isLoading}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={!input.trim() || isLoading || !isAuthenticated}
          className={cn(
            "ml-2 h-10 w-10 rounded-full",
            "transition-all duration-300",
            !input.trim() || !isAuthenticated 
              ? "opacity-50 cursor-not-allowed" 
              : "hover:scale-105"
          )}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
