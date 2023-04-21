import { Admin, ListGuesser, Resource } from "./core-admin";
import { jsonServerProvider } from "./core-admin/data-json-server";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return (
    <Admin dataProvider={dataProvider} requireAuth>
      <Resource name="users" list={ListGuesser} />
    </Admin>
  );
}

export default App;
