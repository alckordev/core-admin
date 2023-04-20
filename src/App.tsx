import { Admin } from "./core-admin";
import { jsonServerProvider } from "./core-admin/data-json-server";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return <Admin dataProvider={dataProvider}></Admin>;
}

export default App;
