import { CoreAdmin } from "./core-admin/core";
import { AppHeader } from "./core-admin/core-ui/layout";

function App() {
  return (
    <CoreAdmin>
      <AppHeader />
      <div>Vite.js + Chakra + Admin</div>
    </CoreAdmin>
  );
}

export default App;
