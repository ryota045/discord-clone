"use client"

import { Member, Message, Profile } from "@prisma/client"
import { ChatWelcome } from "./chat-welcome"
import { useChatQuery } from "@/hooks/use-chat-query"
import { LucideLoader2, ServerCrash } from "lucide-react"
import { Fragment } from "react"

type MessageWithMewmberWithProfile = Message & {
    member: Member & { profile: Profile }
}

interface ChatMessagesProps {
    name: string
    memeber: Member
    chatId: string
    apiUrl: string
    socketUrl: string
    socketQuery: Record<string, any>
    paramKey: "channelId" | "conversationId"
    paramValue: string
    type: "channel" | "conversation"
}

export const ChatMessages = ({
   name,
   memeber,
   chatId,
   apiUrl,
   socketUrl,
   socketQuery,
   paramKey,
   paramValue,
   type
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`

    

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    })

    console.log("message:", data)
    if(status === "pending") {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <LucideLoader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages
                </p>
            </div>
        )
    }     

    if(status === "error") {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500  my-4"/>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something went wrong!
                </p>
            </div>
        )
    }    

    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1"/>

            <ChatWelcome 
                type={type}
                name={name}
            />

            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMewmberWithProfile) => (
                            <div key={message.id}>
                                {message.content}
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}