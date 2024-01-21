import { useSelector } from "react-redux";
import "./App.css";
import NavBar from "./component/ui/NavBar";
import Login from "./component/login/Login";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import Planning from "./component/planning/Planning";

function App() {
  const { isLoged, data } = useSelector((s) => s.datas);

  console.log(isLoged, data);

  return (
    <div className="App">
      <NavBar />
      {!isLoged ? (
        <Login />
      ) : (
        <Suspense>
          <Routes>
            <Route index path="/" element={<Navigate replace to="/home" />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/planning" element={<Planning />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;
