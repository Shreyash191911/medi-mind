'use client';

import { useEffect } from "react";
import { initCometChat } from '@/services/cometChat';
import ClientLayout from "./ClientLayout";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initChat = async () => {
      try {
        await initCometChat();
      } catch (error) {
        console.error('Failed to initialize CometChat:', error);
      }
    };
    
    initChat();
  }, []);

  return <ClientLayout>{children}</ClientLayout>;
} 