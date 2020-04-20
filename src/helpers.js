const schp = (slopeRating, courseRating, banansPar) => {
  let testData = [
    {
      name: "player 1",
      HCP: 20,
      HCPSlope: 0
    },
    {
      name: "player 2",
      HCP: 6.7,
      HCPSlope: 0
    },
    {
      name: "player 3",
      HCP: 1.8,
      HCPSlope: 0
    },
    {
      name: "player 4",
      HCP: 9,
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
  hcpSlopeReduced[index] = 0;

  const newHcpPrel = hcpSlopeReduced.map(hcpPrel =>
    hcpPrel === 0 ? hcpPrel : Math.round(hcpPrel - smallestHCP)
  );

  return newHcpPrel;
};

const hcpSlope = (hcp, courseRating, slopeRating, banansPar) => {
  hcp > 28 ? (hcp = 28) : hcp;

  let hcpSlope = Math.round(
    hcp * (slopeRating / 113) + (courseRating - banansPar)
  );
  return hcpSlope;
};

module.exports = { schp, hcpSlope };
