import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
function App() {
    const [count, setCount] = useState(0);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am ChatGPT",
            sender: "ChatGPT"
        }])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user"
        }

        const newMessages = [...messages, newMessage]; // all the old messages, + the new message

        //update our messages state
        setMessages(newMessages);

        //process message to chatGPT (send it over and see the response)
    }

    return (
        <div className="App">
            <div style={{ position: "relative", height: "800px", width: "700px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList>
                            {messages.map((message, i) => {
                                return <Message key={i} mode1={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder={"Type message here"}  onSend={handleSend}/>
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default App;
