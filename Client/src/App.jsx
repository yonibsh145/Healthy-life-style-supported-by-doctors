import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar , Navbar1, Navbar2,Navbar3 } from "@/widgets/layout";
import routes from "@/routes";

function App() {
  return (
    <>
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
