// UI-Proyotyping mit JavaScript - Sinan Harkci - 271211

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import './App.css';
import ChatComponent from "./ChatComponent.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

    return (
        <div className="App">
            <Header />
            <ChatComponent />
            <Footer />
        </div>
    )
}

export default App;