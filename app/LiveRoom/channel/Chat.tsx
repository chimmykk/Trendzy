"use client"

import { useCallback,  useState, useEffect } from "react";
import { Button, Icons } from "../ui";
import { cn } from "../styles/utils";

// You can use your own data structure for messages, for example:
const initialMessages = [
  {
    id: 1,
    from: "User1",
    message: "Hello!",
    timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
  },
  {
    id: 2,
    from: "User2",
    message: "Hi there!",
    timestamp: new Date(Date.now() - 200000).toLocaleTimeString(),
  },
];


type Props = {
  viewerName: string;
};

export default function Chat({ viewerName }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");

  const onSend = useCallback(() => {
    if (message.trim().length > 0) {
      const newMessage = {
        id: messages.length + 1,
        from: viewerName,
        message: message,
        timestamp: Date.now(),
      };

      // setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  }, [message, viewerName, messages]);

  const onEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend]
  );

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col fixed inset-y-0 right-0 px-2 text-white w-[300px] py-4 h-full">
      <div id="chat-container" className="flex flex-col h-full overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-2 p-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "text-xs font-semibold text-bgGreen",
                    viewerName === message.from && "text-bgGreen"
                  )}
                >
                  {message.from}
                  {viewerName === message.from && " (you)"}
                </div>
                
              </div>
              <div className="text-sm">{message.message}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full gap-2">
        <input
          type="text"
          value={message}
          className="h-10 bg-transparent outline-none border w-[700px] border-[#383636] rounded-md px-2 text-white"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onEnter(e)}
          placeholder="Type a message..."
        />
        <Button
          disabled={message.trim().length === 0}
          onClick={onSend}
        >
          <div className="flex items-center gap-2">
            <Icons.send className="h-4 w-4" />
          </div>
        </Button>
      </div>

    </div>
  );
}
