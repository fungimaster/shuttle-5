const schp = (slopeRating, courseRating, banansPar) => {
  let testData = [
    {
      name: "player 1",
      HCP: -5,
      HCPSlope: 0,
    },
    {
      name: "player 2",
      HCP: 0,
      HCPSlope: 0,
    },
    {
      name: "player 3",
      HCP: 5,
      HCPSlope: 0,
    },
    {
      name: "player 4",
      HCP: 36,
      HCPSlope: 0,
    },
  ];

  let slopeHandicapList = [];

  if (testData[0].HCP + testData[1].HCP > 28) {
    const highestHCP = Math.max(testData[0].HCP, testData[1].HCP);
    const substract = testData[0].HCP + testData[0].HCP - 28;

    if (testData[0].HCP === highestHCP) {
      testData[0].HCP = testData[0].HCP - (testData[0].HCP - substract);
    } else {
      testData[1].HCP = testData[1].HCP - (testData[1].HCP - substract);
    }
  }

  if (testData[2].HCP + testData[3].HCP > 28) {
    const highestHCP = Math.max(testData[2].HCP, testData[3].HCP);
    const substract = testData[2].HCP + testData[2].HCP - 28;

    if (testData[2].HCP === highestHCP) {
      testData[2].HCP = testData[2].HCP - (testData[2].HCP - substract);
    } else {
      testData[3].HCP = testData[3].HCP - (testData[3].HCP - substract);
    }
  }

  // function substractHcpIfOver28(playerA, playerB) {
  //   if (playerA + player2 > 28) {
  //     const highestHCP = Math.max(playerA, playerB);
  //     const substract = playerA + playerB - 28;

  //     if (playerA === highestHCP) {
  //       return (playerA = playerA - (playerA - substract));
  //     } else {
  //       return (playerB = playerB - (playerB - substract));
  //     }
  //   }
  // }

  testData.forEach((player) => {
    slopeHandicapList.push(
      hcpSlope(player.HCP, slopeRating, courseRating, banansPar)
    );
  });

  let hcpSlopeReduced = slopeHandicapList.map((hcpSlope) => hcpSlope * 0.9);

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

const hcpSlope = (hcp, courseRating, slopeRating, banansPar) => {
  // hcp > 28 ? (hcp = 28) : hcp;

  let hcpSlope = Math.round(
    hcp * (slopeRating / 113) + (courseRating - banansPar)
  );
  return hcpSlope;
};

export { schp, hcpSlope };
