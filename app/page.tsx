"use client";

import React, { useState } from "react";
import { Check, Plus, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const users = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "/avatars/01.png",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/avatars/05.png",
  },
  {
    name: "Jackson Lee",
    email: "lee@example.com",
    avatar: "/avatars/02.png",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    avatar: "/avatars/04.png",
  },
] as const;

type User = (typeof users)[number];

type Message = {
  role: string;
  speaker: string;
  content: string;
  timestamp: Date;
};

export function CardsChat() {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState("Sofia Davis");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[][]>([]);
  const inputLength = input.trim().length;

  const handleSwitchChange = () => {
    setCurrentSpeaker((prevSpeaker) =>
      prevSpeaker === "Sofia Davis" ? "Olivia Martin" : "Sofia Davis"
    );
  };

  const handleNewMessage = () => {
    if (messages.length > 0) {
      setChatHistory([...chatHistory, messages]);
      setMessages([]);
    }
  };

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputLength === 0) return;
    const newMessage = {
      role: "user",
      speaker: currentSpeaker,
      content: input,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="grid grid-cols-[240px_1fr] h-screen max-w-full rounded-lg overflow-hidden border">
      <div className="bg-muted/20 p-3 border-r flex flex-col">
        <div className="flex items-center justify-between space-x-4">
          <div className="font-medium text-sm">Chat</div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-8 h-8"
            onClick={handleNewMessage}
          >
            <PenIcon className="h-4 w-4" />
            <span className="sr-only">New message</span>
          </Button>
        </div>
        <div className="py-4">
          <form>
            <Input placeholder="Search" className="h-8" />
          </form>
        </div>
        <div className="grid gap-2 overflow-y-auto">
          {chatHistory.map((chat, index) => {
            const lastMessage = chat[chat.length - 1];
            return (
              <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 bg-muted">
                <Avatar className="border w-10 h-10">
                  <AvatarImage src={`/avatars/${lastMessage.speaker.toLowerCase().replace(" ", "-")}.png`} />
                  <AvatarFallback>{lastMessage.speaker[0]}</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <p className="text-sm font-medium leading-none">{lastMessage.speaker}</p>
                  <p className="text-xs text-muted-foreground truncate">{lastMessage.content}</p>
                  <p className="text-xs text-muted-foreground">{lastMessage.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="overflow-auto flex flex-col justify-between">
        <Card className="w-full h-full mx-auto flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" alt="Image" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{currentSpeaker}</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <Switch id="speaker-switch" onCheckedChange={handleSwitchChange} />
              <Label htmlFor="speaker-switch">Switch Speaker</Label>
            </div>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="ml-4 rounded-full"
                    onClick={() => setOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">New message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={10}>New message</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="overflow-auto flex-1">
            <div className="space-y-4 flex flex-col">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                    message.speaker === "Sofia Davis"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <form
              onSubmit={handleSendMessage}
              className="flex w-full items-center space-x-2"
            >
              <Input
                id="message"
                placeholder="Type your message..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <Button type="submit" size="icon">
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-4 w-4" />
                <span className="sr-only">Upload image</span>
              </Button>
              <Button variant="ghost" size="icon">
                <VideoIcon className="h-4 w-4" />
                <span className="sr-only">Upload video</span>
              </Button>
              <Button variant="ghost" size="icon" className="ml-auto">
                <MicIcon className="h-4 w-4" />
                <span className="sr-only">Send voice message</span>
              </Button>
              <Button variant="ghost" size="icon">
                <BotIcon className="h-4 w-4" />
                <span className="sr-only">Intervention</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="gap-0 p-0 outline-none">
            <DialogHeader className="px-4 pb-4 pt-5">
              <DialogTitle>New message</DialogTitle>
              <DialogDescription>
                Invite a user to this thread. This will create a new group
                message.
              </DialogDescription>
            </DialogHeader>
            <Command className="overflow-hidden rounded-t-none border-t">
              <CommandInput placeholder="Search user..." />
              <CommandList>
                <CommandEmpty>No users found.</CommandEmpty>
                <CommandGroup className="p-2">
                  {users.map((user) => (
                    <CommandItem
                      key={user.email}
                      className="flex items-center px-2"
                      onSelect={() => {
                        if (selectedUsers.includes(user)) {
                          return setSelectedUsers(
                            selectedUsers.filter(
                              (selectedUser) => selectedUser !== user
                            )
                          );
                        }

                        return setSelectedUsers(
                          [...users].filter((u) =>
                            [...selectedUsers, user].includes(u)
                          )
                        );
                      }}
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar} alt="Image" />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      {selectedUsers.includes(user) ? (
                        <Check className="ml-auto flex h-5 w-5 text-primary" />
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
              {selectedUsers.length > 0 ? (
                <div className="flex -space-x-2 overflow-hidden">
                  {selectedUsers.map((user) => (
                    <Avatar
                      key={user.email}
                      className="inline-block border-2 border-background"
                    >
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select users to add to this thread.
                </p>
              )}
              <Button
                disabled={selectedUsers.length < 2}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CardsChat;

function BotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}

function ImageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

function PenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}
