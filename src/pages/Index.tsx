
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import RoleSelector from '@/components/auth/RoleSelector';
import ChatContainer from '@/components/chatbot/ChatContainer';

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen w-full bg-gradient-to-b from-background to-secondary/20 flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-medium text-center mb-2 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Intelligent Assistant
          </h1>
          <p className="text-muted-foreground text-center max-w-md mx-auto animate-fade-up" style={{ animationDelay: '200ms' }}>
            Ask questions about your data or get assistance with any inquiry.
          </p>
        </div>
        
        <div className="w-full animate-fade-up" style={{ animationDelay: '300ms' }}>
          <RoleSelector />
        </div>
        
        <div className="w-full animate-fade-up" style={{ animationDelay: '400ms' }}>
          <ChatContainer />
        </div>
      </div>
    </AuthProvider>
  );
};

export default Index;
