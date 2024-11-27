import { HashRouter as Router } from "react-router-dom";
import Routing from "./Routing/Routing";
import ExtensionContextProvider from "./store/context";

function App() {
  return (
    <Router>
      <ExtensionContextProvider>
        <Routing />
      </ExtensionContextProvider>
    </Router>
  );
}

export default App;
