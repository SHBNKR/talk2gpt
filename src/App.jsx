// UI-Proyotyping mit JavaScript - Sinan Harkci - 271211

import { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition'


const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

function App() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(false);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message}
        });


        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act.
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  // The system message DEFINES the logic of our chatGPT
                ...apiMessages // The messages from our chat with ChatGPT
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
            console.log(data);
            return data.json();
        }).then((data) => {
            console.log(data);
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setIsTyping(true);
        });
    }

    // Speech recognition module
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    // check if Browser supports SpeechRecognition
    if(!browserSupportsSpeechRecognition) {
        return <span>Your Browser doesn't support Speech to Text</span>
    }

    const voiceCommands = {
        send: ['send', 'submit', 'post']
    };


    return (
        <div className="App">
            <div style={{ position:"relative", height: "800px", width: "700px"  }}>

                <p>Microphone: {listening ? 'on' : 'off'} </p>
                <button onClick={SpeechRecognition.startListening}>Start</button>
                {/*<button onClick={SpeechRecognition.stopListening}>Stop</button>*/}
                <button onClick={resetTranscript}>Reset</button>
                <p> {transcript}</p>

                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {
                                messages.map((message , i) => {
                                console.log(message)
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} value={transcript} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default App