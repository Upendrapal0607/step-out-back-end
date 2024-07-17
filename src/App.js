import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Components/Header";
import { AllRoute } from "./Routes/route";

function App() {
  return (
    <div className="App bg-white">
      <Header />
      <AllRoute />
    </div>
  );
}

export default App;
