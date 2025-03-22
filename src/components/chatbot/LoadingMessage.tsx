
import React from 'react';

const LoadingMessage: React.FC = () => {
  return (
    <div className="message-bubble-assistant w-auto max-w-[60%] mb-4">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce-gentle" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce-gentle" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce-gentle" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  );
};

export default LoadingMessage;
