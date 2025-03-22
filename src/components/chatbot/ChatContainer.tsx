
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChatbotApi, Message } from '@/hooks/use-chatbot-api';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import LoadingMessage from './LoadingMessage';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { sendMessage, isLoading } = useChatbotApi();
  const { isAuthenticated, userRole } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to add a new message
  const addMessage = (content: string, sender: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Handle sending a new message
  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage(content, 'user');
    
    // Get response from API
    const response = await sendMessage(content);
    
    // Add assistant response if we got one
    if (response) {
      addMessage(response, 'assistant');
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([]);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message on first render or when auth status changes
  useEffect(() => {
    if (messages.length === 0) {
      if (isAuthenticated) {
        addMessage(`Welcome! You're logged in as a ${userRole}. How can I help you today?`, 'assistant');
      } else {
        addMessage("Please log in to use the chatbot. Select a role from the login options above.", 'assistant');
      }
    }
  }, [isAuthenticated, userRole]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-[80vh] rounded-xl glass-panel overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div>
          <h2 className="text-lg font-medium">AI Assistant</h2>
          {isAuthenticated && userRole && (
            <p className="text-xs text-muted-foreground">Logged in as: {userRole}</p>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearChat}
          className="text-muted-foreground hover:text-foreground"
          disabled={messages.length <= 1}
        >
          <X className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
      </div>
      
      {/* Messages container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4"
      >
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <LoadingMessage />}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
