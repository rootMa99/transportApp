import { useDispatch, useSelector } from "react-redux";
import c from "../home/Home.module.css";
import cs from "../home/Crews.module.css";
import BackDrop from "../ui/BackDrop";
import morning from "../../assets/morning.png";
import eveningpic from "../../assets/evening.png";
import nightPic from "../../assets/night.png";
import enAm from "../../assets/8am.png";
import enpm from "../../assets/16h.png";
import enpmt from "../../assets/17h.png";
import hos from "../../assets/hos.png";
import inact from "../../assets/inact.png";
import { getCrewsfilter, getIndivFilter } from "../hooks/getCrews";
import { useState } from "react";
import Notification from "./Notification";
import NotificationSubmit from "./NotificationSubmit";
import { dataSliceAction } from "../store/DataSlice";

const Planning = (p) => {
  const { data } = useSelector((s) => s.datas);
  const dispatch = useDispatch();
  const [crews, setCrews] = useState(
    getCrewsfilter(
      data.filter((f) => f.status !== "infirmity" && f.status !== "inactive")
    )
  );
  const [individuals, setIndividuals] = useState(
    getIndivFilter(
      data.filter((f) => f.status !== "infirmity" && f.status !== "inactive")
    )
  );
  const [night, setNight] = useState([]);
  const [mor, setMor] = useState([]);
  const [evening, setEvening] = useState([]);
  const [type, setType] = useState();
  const [zone, setZone] = useState();
  const [admin, setAdmin] = useState({
    adminOne: [],
    adminTwo: [],
  });
  const [notify, setNotify] = useState({ rend: false, data: {} });
  const [notifyS, setNotifyS] = useState(false);
  const [inactive, setInactive] = useState(
    data.filter((f) => f.status === "inactive")
  );
  console.log(crews, individuals, night, type, zone);
  console.log(
    "zone",
    "mor",
    mor,
    "eve",
    evening,
    "nig",
    night,
    "ad1",
    admin.adminOne,
    "ad2",
    admin.adminTwo
  );
  const submitclick = (e) => {
    const dataSubmit = {
      morning: mor,
      evening: evening,
      night: night,
      adminOne: admin.adminOne,
      adminTwo: admin.adminTwo,
    };
    console.log(dataSubmit);
    dispatch(dataSliceAction.setPlannedData(dataSubmit));
    setNotifyS(false);
  };
  const cancelSubmit = (e) => {
    setNotifyS(false);
  };

  const sicknessData = data.filter((f) => f.status === "infirmity");
  const handleDragStart = (e, id, type, zone) => {
    e.dataTransfer.setData("text/plain", id);
    setType(type);
    setZone(zone);
  };
  const clicknotify = (e, type, data) => {
    setNotify({ rend: false, data: {} });
    type === "morning" && setMor((prev) => [...prev, data]);
    type === "evening" && setEvening((prev) => [...prev, data]);
    type === "inactive" && setInactive((prev) => [...prev, data]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text/plain");

    if (zone === undefined) {
      let selected =
        type === "indiv"
          ? individuals.filter((f) => f.matricule === +draggedItem)
          : crews.filter((f) => f.crewName === draggedItem);
      console.log("ruun", selected, type, draggedItem, targetId);
      if (targetId === "night") {
        if (type === "indiv") {
          if (selected[0].status === "inapt") {
            setNotify({
              rend: true,
              data: selected[0],
            });
          } else {
            setNight((prev) => [...prev, ...selected]);
          }
        } else {
          selected[0].employee.map((m) => {
            if (m.status === "inapt") {
              const selectedf = selected[0].employee.filter(
                (f) => f.matricule !== m.matricule
              );
              selected[0].employee = selectedf;
              setNotify({
                rend: true,
                data: m,
              });
            }
            return null;
          });
          setNight((prev) => [...prev, ...selected]);
        }
      }
      if (targetId === "adminOne") {
        if (type === "crew") {
          alert("Crew not allowed here. Please choose some shift for them");
          return;
        }
        setAdmin((prev) => ({
          ...prev,
          adminOne: [...prev.adminOne, ...selected],
        }));
      }
      if (targetId === "adminTwo") {
        if (type === "crew") {
          alert("Crew not allowed here. Please choose some shift for them");
          return;
        }
        setAdmin((prev) => ({
          ...prev,
          adminTwo: [...prev.adminTwo, ...selected],
        }));
      }
      targetId === "morning" && setMor((prev) => [...prev, ...selected]);
      targetId === "evening" && setEvening((prev) => [...prev, ...selected]);

      type === "indiv"
        ? setIndividuals((prev) => [
            ...prev.filter((f) => f.matricule !== +draggedItem),
          ])
        : setCrews((prev) => [
            ...prev.filter((f) => f.crewName !== draggedItem),
          ]);
    } else {
      const selecte = () => {
        if (zone === "morning") {
          if (type === "indiv") {
            setMor((prev) => [
              ...prev.filter((f) => f.matricule !== +draggedItem),
            ]);
          } else {
            if (targetId === "adminOne" || targetId === "adminTwo") {
              return;
            }
            setMor((prev) => [
              ...prev.filter((f) => f.crewName !== draggedItem),
            ]);
          }
          return type === "indiv"
            ? mor.filter((f) => f.matricule === +draggedItem)
            : mor.filter((f) => f.crewName === draggedItem);
        }
        if (zone === "evening") {
          if (type === "indiv") {
            setEvening((prev) => [
              ...prev.filter((f) => f.matricule !== +draggedItem),
            ]);
          } else {
            if (targetId === "adminOne" || targetId === "adminTwo") {
              return;
            }
            setEvening((prev) => [
              ...prev.filter((f) => f.crewName !== draggedItem),
            ]);
          }
          return type === "indiv"
            ? evening.filter((f) => f.matricule === +draggedItem)
            : evening.filter((f) => f.crewName === draggedItem);
        }
        if (zone === "night") {
          if (type === "indiv") {
            setNight((prev) => [
              ...prev.filter((f) => f.matricule !== +draggedItem),
            ]);
          } else {
            if (targetId === "adminOne" || targetId === "adminTwo") {
              return;
            }
            setNight((prev) => [
              ...prev.filter((f) => f.crewName !== draggedItem),
            ]);
          }
          return type === "indiv"
            ? night.filter((f) => f.matricule === +draggedItem)
            : night.filter((f) => f.crewName === draggedItem);
        }
        if (zone === "adminOne") {
          setAdmin((prev) => ({
            ...prev,
            adminOne: [
              ...prev.adminOne.filter((f) => f.matricule !== +draggedItem),
            ],
          }));
          return admin.adminOne.filter((f) => f.matricule === +draggedItem);
        }
        if (zone === "adminTwo") {
          setAdmin((prev) => ({
            ...prev,
            adminTwo: [
              ...prev.adminTwo.filter((f) => f.matricule !== +draggedItem),
            ],
          }));
          return admin.adminTwo.filter((f) => f.matricule === +draggedItem);
        }
      };
      let selected = selecte();
      console.log("ruun", selected, targetId, zone);
      if (targetId === "night") {
        if (type === "indiv") {
          if (selected[0].status === "inapt") {
            setNotify({
              rend: true,
              data: selected[0],
            });
          }
        } else {
          selected[0].employee.map((m) => {
            if (m.status === "inapt") {
              const selectedf = selected[0].employee.filter(
                (f) => f.matricule !== m.matricule
              );
              selected[0].employee = selectedf;
              setNotify({
                rend: true,
                data: m,
              });
            }
            return null;
          });
          console.log(notify.data);
        }
        setNight((prev) => [...prev, ...selected]);
      }
      targetId === "morning" && setMor((prev) => [...prev, ...selected]);
      targetId === "evening" && setEvening((prev) => [...prev, ...selected]);
      if (targetId === "adminOne") {
        type === "indiv"
          ? setAdmin((prev) => ({
              ...prev,
              adminOne: [...prev.adminOne, ...selected],
            }))
          : alert("not allowed!");
      }
      if (targetId === "adminTwo") {
        type === "indiv"
          ? setAdmin((prev) => ({
              ...prev,
              adminTwo: [...prev.adminTwo, ...selected],
            }))
          : alert("not allowed!");
      }
    }
  };

  return (
    <div className={c.wrapper}>
      {notify.rend && <BackDrop />}
      {notify.rend && <Notification data={notify.data} click={clicknotify} />}
      {notifyS && (
        <NotificationSubmit click={submitclick} cancelSubmit={cancelSubmit} />
      )}
      <div className={c.center}>
        <div className={c.content}>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderInfi} ${cs.crewHolderP}`}
            // onDragOver={handleDragOver}
            // onDrop={(e) => handleDrop(e, "night")}
          >
            <h1 className={cs.titless}>infirmity</h1>

            <img src={hos} alt="mor" className={cs.imgsh} draggable={false} />
            {sicknessData.length > 0 ? (
              sicknessData.map((m, i) => (
                <span key={i} style={{ cursor: "pointer" }}>
                  {m.matricule}
                </span>
              ))
            ) : (
              <h1 className={cs.notFound}>NO Item</h1>
            )}
          </div>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderInfi} ${cs.crewHolderP}`}
            // onDragOver={handleDragOver}
            // onDrop={(e) => handleDrop(e, "night")}
          >
            <img
              src={inact}
              alt="mor"
              className={`${cs.img} ${cs.imgIn}`}
              draggable={false}
            />

            <h1 className={cs.titless}>inactive</h1>
            {inactive.length > 0 ? (
              inactive.map((m, i) => (
                <span key={i} style={{ cursor: "pointer" }}>
                  {m.matricule}
                </span>
              ))
            ) : (
              <h1 className={cs.notFound}>NO Item</h1>
            )}
          </div>
        </div>

        <div className={c.content}>
          <div className={cs.crewHolderP}>
            <h1 className={cs.title}>crews</h1>
            {crews.length > 0 ? (
              crews.map((m, i) => (
                <span
                  key={i}
                  draggable
                  onDragStart={(e) => handleDragStart(e, m.crewName, "crew")}
                >
                  {m.crewName}
                </span>
              ))
            ) : (
              <h1 className={cs.notFound}>no crews found </h1>
            )}
          </div>
          <div className={cs.crewHolderP}>
            <h1 className={cs.title}>individuals</h1>
            {individuals.length > 0 ? (
              individuals.map((m, i) => (
                <span
                  key={i}
                  draggable
                  onDragStart={(e) => handleDragStart(e, m.matricule, "indiv")}
                >
                  {m.matricule}
                </span>
              ))
            ) : (
              <h1 className={cs.notFound}>no crews found </h1>
            )}
          </div>
        </div>
        <div className={cs.crewHolderPSh}>
          <h1 className={cs.titles}>Shifts</h1>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderPsM} ${cs.crewHolderP}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "morning")}
          >
            <img src={morning} alt="mor" className={cs.img} draggable={false} />
            {/* <h1 className={cs.titler}>morning</h1> */}

            {mor.length === 0 ? (
              <h1 className={cs.notFound}>NO Item</h1>
            ) : (
              mor.map((m, i) =>
                m.hasOwnProperty("crewName") ? (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.crewName, "crew", "morning")
                    }
                  >
                    {m.crewName}
                  </span>
                ) : (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.matricule, "indiv", "morning")
                    }
                  >
                    {m.matricule}
                  </span>
                )
              )
            )}
          </div>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderPsE} ${cs.crewHolderP}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "evening")}
          >
            <img
              src={eveningpic}
              alt="mor"
              className={cs.img}
              draggable={false}
            />
            {/* <h1 className={cs.titler}>evening</h1> */}

            {evening.length === 0 ? (
              <h1 className={cs.notFound}>NO Item</h1>
            ) : (
              evening.map((m, i) =>
                m.hasOwnProperty("crewName") ? (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.crewName, "crew", "evening")
                    }
                  >
                    {m.crewName}
                  </span>
                ) : (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.matricule, "indiv", "evening")
                    }
                  >
                    {m.matricule}
                  </span>
                )
              )
            )}
          </div>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderPsN} ${cs.crewHolderP}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "night")}
          >
            <img
              src={nightPic}
              alt="mor"
              className={cs.img}
              draggable={false}
            />
            {/* <h1 className={cs.titler}>night</h1> */}

            {night.length === 0 ? (
              <h1 className={cs.notFound}>NO Item</h1>
            ) : (
              night.map((m, i) =>
                m.hasOwnProperty("crewName") ? (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.crewName, "crew", "night")
                    }
                  >
                    {m.crewName}
                  </span>
                ) : (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.matricule, "indiv", "night")
                    }
                  >
                    {m.matricule}
                  </span>
                )
              )
            )}
          </div>
        </div>
        <div className={cs.crewHolderPSh}>
          <h1 className={cs.titles}>Admin</h1>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderAdmin} ${cs.crewHolderP}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "adminOne")}
          >
            <img src={enAm} alt="mor" className={cs.imgs} draggable={false} />
            <img src={enpm} alt="mor" className={cs.imgss} draggable={false} />
            {admin.adminOne.length === 0 ? (
              <h1 className={cs.notFound}>NO Item</h1>
            ) : (
              admin.adminOne.map((m, i) => (
                <span
                  key={i}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, m.matricule, "indiv", "adminOne")
                  }
                >
                  {m.matricule}
                </span>
              ))
            )}
          </div>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderAdmin} ${cs.crewHolderP}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "adminTwo")}
          >
            <img src={enAm} alt="mor" className={cs.imgs} draggable={false} />
            <img src={enpmt} alt="mor" className={cs.imgss} draggable={false} />
            {admin.adminTwo.length === 0 ? (
              <h1 className={cs.notFound}>NO Item</h1>
            ) : (
              admin.adminTwo.map((m, i) => (
                <span
                  key={i}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, m.matricule, "indiv", "adminTwo")
                  }
                >
                  {m.matricule}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
      <div className={cs.btnHolder}>
        <button onClick={() => setNotifyS(true)}>
          <span>submit</span>
        </button>
      </div>
    </div>
  );
};

export default Planning;
