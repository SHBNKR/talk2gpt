// UI-Proyotyping mit JavaScript - Sinan Harkci - 271211

import Chatcomponent from './ChatContainer.jsx';
import Header from "./components/header/Header";
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Chatcomponent />
        </div>
    )
}

export default App