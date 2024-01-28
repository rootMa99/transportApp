export const getCrewsfilter = (data) => {
  const returnedData = [];

  for (const i of data) {
    if (i.crew === null) {
      continue;
    }
    if (returnedData.length === 0) {
      returnedData.push({
        crewName: i.crew,
        employee: [i],
      });
      continue;
    }
    const index = returnedData.findIndex((f) => f.crewName === i.crew);
    if (index === -1) {
      returnedData.push({
        crewName: i.crew,
        employee: [i],
      });
    } else {
      returnedData[index].employee.push(i);
    }
  }
  return returnedData;
};

export const getIndivFilter = (data) => {
  const returnedData = [];
  for (const i of data) {
    if (i.crew === null) {
      returnedData.push(i);
    }
  }
  return returnedData;
};

// export const notsick=data=>{
//   return data.filter(f=>f.status !== "inapt");
// }

export const dataConstruter = (data) => {
  const returnedData = [];
  data.forEach((e) => {
    if (e.hasOwnProperty("crewName")) {
      returnedData.push(...e.employee);
    }else{
      returnedData.push(e);
    }
  });

  return returnedData;
};



export const paradasFilter=data=>{

  const returnedData = [];

  for (const i of data) {
    if (returnedData.length === 0) {
      returnedData.push({
        parada: i.parada,
        matricule: [i.matricule],
      });
      continue;
    }
    const index = returnedData.findIndex((f) => f.parada === i.parada);
    if (index === -1) {
      returnedData.push({
        parada: i.parada,
        matricule: [i.matricule],
      });
    } else {
      returnedData[index].matricule.push(i.matricule);
    }
  }
  return returnedData;
}