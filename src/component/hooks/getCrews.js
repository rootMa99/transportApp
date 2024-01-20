export const getCrewsfilter = (data) => {
  const returnedData = [];

  for (const i of data) {
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
