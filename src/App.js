import logo from "./logo.svg";
import { SnackbarProvider } from "notistack";
import "./App.css";
import HomePage from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <HomePage />
      </SnackbarProvider>
    </div>
  );
}

export default App;
