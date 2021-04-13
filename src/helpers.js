const shcp = (players) => {
  let playerData = players;
  let slopeHandicapList = [];

  //slope-hcp
  playerData.forEach((player) => {
    slopeHandicapList.push(player.shcp);
  });

  let hcpSlopeReduced = slopeHandicapList.reduce((total, amount) => {
    total.push(Math.sign(amount) === 1 ? amount * 0.9 : amount * 1.1)
    return total
  }, [])

  let smallestHCP = 999;
  hcpSlopeReduced.forEach((hcp) => {
    if (hcp < smallestHCP) {
      smallestHCP = hcp;
    }
  });
  const index = hcpSlopeReduced.findIndex((hcp) => hcp === smallestHCP);
  hcpSlopeReduced[index] = null;

  const newHcpPrel = hcpSlopeReduced.map((hcpPrel) =>
    hcpPrel === null ? hcpPrel : Math.round(hcpPrel - smallestHCP)
  );

  const isNull = (number) => number === null;
  const indexOfNull = newHcpPrel.findIndex(isNull);
  newHcpPrel[indexOfNull] = 0;

  return { slopeHandicapList, newHcpPrel };
};


const calculateSlopeRating = (hcp, slopeValue, courseRating, coursePar) =>  {
  return Math.round(hcp * (slopeValue / 113) + (courseRating - coursePar));
}


export { shcp, calculateSlopeRating  };
