import { Suspense } from 'react';
import ChatFeatures from '@/features/chat/ui/ChatFeatures';

function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatFeatures />
    </Suspense>
  );
}

export default ChatPage;
