"use client";
import { useEffect, useRef } from "react";

interface UseRealTimeUserDetectionProps {
  appId: string;
  onUserDetected: () => void;
  isEnabled: boolean;
  pollingInterval?: number;
}

export function useRealTimeUserDetection({
  appId,
  onUserDetected,
  isEnabled,
  pollingInterval = 5000, // Poll every 5 seconds
}: UseRealTimeUserDetectionProps) {
  const hasDetectedUsers = useRef(false);

  useEffect(() => {
    if (!isEnabled || hasDetectedUsers.current) return;

    const pollForUsers = async () => {
      try {
        const response = await fetch(`/api/app/users/${appId}`);
        if (response.ok) {
          const data = await response.json();

          // Check if we have users
          if (data?.data && data.data.length > 0) {
            hasDetectedUsers.current = true;
            onUserDetected();
          }
        }
      } catch (error) {
        console.error("Error polling for users:", error);
      }
    };

    // Initial check
    pollForUsers();

    // Set up polling
    const interval = setInterval(pollForUsers, pollingInterval);

    return () => {
      clearInterval(interval);
    };
  }, [appId, onUserDetected, isEnabled, pollingInterval]);

  return {
    stopPolling: () => {
      hasDetectedUsers.current = true;
    },
  };
}
