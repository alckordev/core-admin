import { Admin, ListGuesser, Resource } from "./core-admin";
import { jsonServerProvider } from "./core-admin/data-json-server";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      dashboard={() => <div>Dashboard</div>}
      requireAuth
    >
      <Resource
        name="users"
        list={ListGuesser}
        create={<div>User create view</div>}
        edit={<div>User edit view</div>}
        show={<div>User show view</div>}
      />
      <Resource
        name="posts"
        list={ListGuesser}
        create={<div>Post create view</div>}
        edit={<div>Post edit view</div>}
        show={<div>Post show view</div>}
      />
    </Admin>
  );
}

export default App;
