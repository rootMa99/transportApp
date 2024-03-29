import { useSelector } from "react-redux";
import "./App.css";
import NavBar from "./component/ui/NavBar";
import Login from "./component/login/Login";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import Planning from "./component/planning/Planning";
import NotificationSubmit from "./component/planning/NotificationSubmit";
import RootHome from "./component/root/RootHome";

function App() {
  const { isLoged, data, plannedData} = useSelector((s) => s.datas);

  console.log(isLoged, data, plannedData);

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
            <Route exact path="/assignTeamLeader" element={<NotificationSubmit />}/>
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </Suspense>
      ) : (
        <Suspense>
          <Routes>
            <Route index path="/" element={<Navigate replace to="/rootHome" />} />
            <Route exact path="/rootHome" element={<RootHome data={plannedData} />} />
            <Route path="*" element={<Navigate replace to="/rootHome" />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;
