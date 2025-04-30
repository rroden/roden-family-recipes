import { AppProvider } from "../context/AppContext";
import AppRoutes from "../routes";

const App = () => (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
  
  export default App;