import { cn } from '@/lib/utils';
import React from 'react'

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

const Agent = ({ userName }: AgentProps) => {
    const callStatus: CallStatus = CallStatus.FINISHED;
    const isSpeaking = true;

    const messages = [
        'Hello, What is your name?',
        'My name is Suhan.',
    ]

    const lastMessage = messages[messages.length - 1];

    return (
        <>
            <div className="call-view">
                <div className='card-interviewer'>
                    <div className='avatar'>
                        <img src="/ai-avatar.png" alt="Avatar" height={65} width={54} className='object-cover' />
                        {isSpeaking && <span className='animate-speak' />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>
                <div className='card-border'>
                    <div className='card-content'>
                        <img src="/user-avatar.png" alt="User" height={540} width={540} className='object-cover rounded-full size-[120px]' />
                        <h3>{userName}</h3>
                    </div>

                </div>
            </div>

            {messages.length > 0 && (
                <div className='transcript-border'>
                    <div className='transcript'>
                        <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>{lastMessage}</p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button className="relative btn-call">
                        <span
                            className={cn(
                                "absolute animate-ping rounded-full opacity-75",
                                callStatus !== CallStatus.CONNECTING && "hidden"
                            )}
                        />
                        <span className="relative">
                            {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                                ? "Call"
                                : ". . ."}
                        </span>
                    </button>
                ) : (
                    <button className="btn-disconnect">
                        End
                    </button>
                )}
            </div>
        </>
    )
}

export default Agent