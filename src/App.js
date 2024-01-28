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
      {!isLoged.login ? (
        <Login />
      ) : isLoged.role === "plaingLeader" ? (
        <Suspense>
          <Routes>
            <Route index path="/" element={<Navigate replace to="/home" />} />
            <Route exact path="/home" element={<Home data={data} />} />
            <Route exact path="/planning" element={<Planning />} />
            <Route exact path="/assignTeamLeader" />
          </Routes>
        </Suspense>
      ) : (
        <Suspense>
          <Routes>
            <Route index path="/" element={<Navigate replace to="/rootHome" />} />
            <Route exact path="/rootHome" element={<Home data={data} />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;
