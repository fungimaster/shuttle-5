const schp = (slopeRating, courseRating, banansPar) => {
  let testData = [
    {
      name: "player 1",
      HCP: -5,
      HCPSlope: 0
    },
    {
      name: "player 2",
      HCP: 0,
      HCPSlope: 0
    },
    {
      name: "player 3",
      HCP: 5,
      HCPSlope: 0
    },
    {
      name: "player 4",
      HCP: 10,
      HCPSlope: 0
    }
  ];

  let slopeHandicapList = [];
  testData.forEach(player => {
    slopeHandicapList.push(
      hcpSlope(player.HCP, slopeRating, courseRating, banansPar)
    );
  });

  let hcpSlopeReduced = slopeHandicapList.map(hcpSlope => hcpSlope * 0.9);

  let smallestHCP = 999;
  hcpSlopeReduced.forEach(hcp => {
    if (hcp < smallestHCP) {
      smallestHCP = hcp;
    }
  });
  const index = hcpSlopeReduced.findIndex(hcp => hcp === smallestHCP);
  hcpSlopeReduced[index] = null;

  const newHcpPrel = hcpSlopeReduced.map(hcpPrel =>
    hcpPrel === null ? hcpPrel : Math.round(hcpPrel - smallestHCP)
  );

   const isNull = (number) => number === null
   const indexOfNull = newHcpPrel.findIndex(isNull)
   newHcpPrel[indexOfNull] = 0

  return newHcpPrel;
};

const hcpSlope = (hcp, courseRating, slopeRating, banansPar) => {
  hcp > 28 ? (hcp = 28) : hcp;

  let hcpSlope = Math.round(
    hcp * (slopeRating / 113) + (courseRating - banansPar)
  );
  return hcpSlope;
};

export { schp, hcpSlope };
