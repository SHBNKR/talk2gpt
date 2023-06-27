// UI-Proyotyping mit JavaScript - Sinan Harkci - 271211

import Header from "./components/header/Header";
import './App.css';
import ChatComponent from "./ChatComponent.jsx";

function App() {

    return (
        <div className="App">
            <Header />
            <ChatComponent />
        </div>
    )
}

export default App;