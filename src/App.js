import { useSelector } from "react-redux";
import "./App.css";
import NavBar from "./component/ui/NavBar";
import Login from "./component/login/Login";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";

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
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;
