
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Default API URL - in a real app, you might want to use an environment variable
const API_URL = 'https://api.example.com';

// Message type definition
export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

export const useChatbotApi = () => {
  const { isAuthenticated, userRole } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userQuery: string): Promise<string> => {
    if (!isAuthenticated || !userRole) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use the chatbot.",
        variant: "destructive",
      });
      return "";
    }

    setIsLoading(true);

    try {
      // Construct the URL based on the user's role
      const url = `${API_URL}/${userRole}/chatbot`;
      
      // Send the request with the user query
      const response = await axios.post(url, { user_query: userQuery });
      
      // Check if the response is "0"
      if (response.data === "0" || response.data === 0) {
        return "Could you please rephrase the query in a more exhaustive manner OR search using the tables.";
      }
      
      // Return the response data
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      return "Sorry, I encountered an error processing your request.";
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading,
  };
};
