// ChatContainer.jsx

import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Avatar,
    ChatContainer,
    ConversationHeader,
    InfoButton,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    TypingIndicator,
    VoiceCallButton
} from '@chatscope/chat-ui-kit-react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {useSpeechSynthesis} from 'react-speech-kit';


// import of assets
import gpt_logo from './assets/gpt_logo.jpg';
import gpt_logo_black from './assets/chatgpt.png';
import mic_mute from './assets/mic_mute.png';
import mic from './assets/mic.png';


// Beispiel
const systemMessage = {
    role: "system",
    content: "Explain things like you're talking to a software professional with 2 years of experience."
};
// Beispiel 2:
/*const systemMessage = {
    role: "system",
    content: "Explain things like you're talking to a 6 years old ."
};*/

const API_KEY = "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";

function ChatComponent() {
    const {speak, cancel} = useSpeechSynthesis();
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm Talk2GPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false); // Variable zum Steuern des Spracherkennungsprozesses
    const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);

    const handleSend = async () => {

        const newMessage = transcript;

        const newMessageObject = {
            message: newMessage,
            direction: 'outgoing',
            sender: 'user',
        };

        const newMessages = [...messages, newMessageObject];

        setMessages(newMessages);
        setIsTyping(false);
        await processMessageToChatGPT(newMessages);
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.sender === 'ChatGPT') {
            setIsAssistantSpeaking(true);
            speak({text: lastMessage.message});
        }
        stopListening();
        resetTranscript(); // Leere den erkannten Text
    };

    useEffect(() => {
        if (!isAssistantSpeaking) {
            setIsAssistantSpeaking(false);
        }
    }, [isAssistantSpeaking]);


    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages

        let apiMessages = chatMessages.map((messageObject) => {
            let role;
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return {role: role, content: messageObject.message}
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
            return data.json();
        }).then((data) => {
            console.log(data);
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setIsTyping(true);
            setIsAssistantSpeaking(true);
            speak({text: data.choices[0].message.content});
        });
    }

    // Speech recognition module
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition()

    // check if Browser supports SpeechRecognition
    if (!browserSupportsSpeechRecognition) {
        return <span>Your Browser doesn't support Speech to Text</span>
    }

    // Start & Stop Microphone
    const startListening = () => {
        setIsListening(true);
    };

    const stopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (isListening) {
            SpeechRecognition.startListening({continuous: true});
        } else {
            SpeechRecognition.stopListening();
        }
    }, [isListening]);

    // Sprachausgabe

    // cancel/reset the speech of GPT
    const cancelGPTSpeech = () => {
        setIsAssistantSpeaking(false);
        cancel();
    }

    function handleMessageSpeech(message) {
        if (message.sender === 'ChatGPT') {
            setIsAssistantSpeaking(true);
            speak({text: message.message});
            startListening();
        }
    }

    return (

        <div style={{margin: "0 auto", width: "700px", height: "650px"}}>

            <p>Microphone: {isListening ? <img src={mic} width={'30px'} height={'30px'} alt={"."}/> :
                <img src={mic_mute} width={'30px'} height={'30px'} alt={"."}/>}  </p>

            <MainContainer>

                <ChatContainer>

                    <ConversationHeader>
                        <Avatar src={gpt_logo_black} name="GPT"/>
                        <ConversationHeader.Content userName="GPT" info="just talk to me ... "/>
                        <ConversationHeader.Actions>
                            <button onClick={startListening}>Start</button>
                            <button onClick={stopListening}>Stop</button>
                            <button onClick={resetTranscript}>Reset</button>
                            <button onClick={() => cancelGPTSpeech()}>Cancel</button>
                            <button> .</button>
                            <button onClick={handleSend}>Senden</button>
                            <VoiceCallButton/>
                            <InfoButton/>
                        </ConversationHeader.Actions>
                    </ConversationHeader>

                    <MessageList
                        scrollBehavior="smooth"
                        typingIndicator={isTyping ?
                            <TypingIndicator content="ChatGPT is typing"/> : null}>

                        {
                            messages.map((message, i) => {
                                console.log(message)
                                return <Message key={i}
                                                model={message}
                                                onClick={() => handleMessageSpeech(message)}>
                                    {message.sender === "ChatGPT" && (
                                        <Avatar src={gpt_logo} name={"ChatGPT"} status="available"/>)}
                                </Message>
                            })}
                    </MessageList>
                    <MessageInput placeholder="Type message here"
                                  onSend={handleSend}
                                  value={transcript || ''}
                                  onSubmit={handleSend}
                    />
                </ChatContainer>
            </MainContainer>

            {/*
            <SpeechRecognitionComponent onResult={handleSend} />
*/}

        </div>
    );

}

export default ChatComponent;