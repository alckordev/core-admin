import { AdminRouter, CoreAdmin, Layout, Admin } from "./core-admin";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Admin>
      {/* <AdminRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/users/*" element={<Resource />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<CatchAll title="example" />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </AdminRouter> */}
    </Admin>
  );
}

export default App;

// function Resource() {
//   return (
//     <Routes>
//       <Route path="/" element={<h3>User</h3>} />
//       <Route path="/:id" element={<h3>User detail</h3>} />
//     </Routes>
//   );
// }

// function Dashboard() {
//   return <h3>Dashboard</h3>;
// }

// function CatchAll({ title }: { title: string }) {
//   return <h3>CatchAll: {title}</h3>;
// }
