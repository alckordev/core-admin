import { CoreAdmin } from "./core-admin/core";
import { Layout } from "./core-admin/core-ui/layout";

function App() {
  return (
    <CoreAdmin>
      <Layout>
        <div>Vite.js + Chakra + Admin</div>
      </Layout>
    </CoreAdmin>
  );
}

export default App;
