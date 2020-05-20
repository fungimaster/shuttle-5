const schp = (slopeRating, courseRating, banansPar, players) => {
  // let testData = [
  //   {
  //     name: "player 1",
  //     hcp: 36,
  //     HCPSlope: 0,
  //   },
  //   {
  //     name: "player 2",
  //     hcp: 36,
  //     HCPSlope: 0,
  //   },
  //   {
  //     name: "player 3",
  //     hcp: 14.9,
  //     HCPSlope: 0,
  //   },
  //   {
  //     name: "player 4",
  //     hcp: 15.0,
  //     HCPSlope: 0,
  //   },
  // ];

  let testData = players;
  let slopeHandicapList = [];

  //FIXAR LAG hcp PÅ MAX 28
  //SPELARE 1-2

  function max28perTeam(hcp1, hcp2) {
    let newHcp1 = hcp1;
    let newHcp2 = hcp2;

    if (hcp1 + hcp2 < 28) {
      return;
    }
    if (hcp1 === hcp2) {
      const difference = hcp1 + hcp2 - 28;
      newHcp1 = hcp1 - difference / 2;
      newHcp2 = hcp2 - difference / 2;
    }

    const highestHCP = Math.max(hcp1, hcp2);
    const substract = hcp1 + hcp2 - 28;

    if (hcp1 === highestHCP && hcp1 !== hcp2) {
      newHcp1 = hcp1 - substract;
    }

    if (hcp2 === highestHCP && hcp1 !== hcp2) {
      newHcp2 = hcp2 - substract;
    }

    return { newHcp1, newHcp2 };
  }

  let { newHcp1, newHcp2 } = max28perTeam(testData[0].hcp, testData[1].hcp);
  let { newHcp3, newHcp4 } = max28perTeam(testData[2].hcp, testData[3].hcp);

  testData[0].hcp = newHcp1;
  testData[1].hcp = newHcp2;
  testData[2].hcp = newHcp3;
  testData[3].hcp = newHcp4;

  // if (testData[0].hcp + testData[1].hcp > 28) {
  //   if (testData[0].hcp === testData[1].hcp) {
  //     const difference = testData[0].hcp + testData[1].hcp - 28;
  //     testData[0].hcp = testData[0].hcp - difference / 2;
  //     testData[1].hcp = testData[1].hcp - difference / 2;
  //   }

  //   const highestHCP = Math.max(testData[0].hcp, testData[1].hcp);
  //   const substract = testData[0].hcp + testData[1].hcp - 28;

  //   if (testData[0].hcp === highestHCP && testData[0].hcp !== testData[1].hcp) {
  //     testData[0].hcp = testData[0].hcp - substract;
  //   }

  //   if (testData[0].hcp === highestHCP && testData[0].hcp !== testData[1].hcp) {
  //     testData[1].hcp = testData[1].hcp - substract;
  //   }
  // }

  // //SPELARE 3-4
  // if (testData[2].hcp + testData[3].hcp > 28) {
  //   if (testData[2].hcp === testData[3].hcp) {
  //     const difference = testData[2].hcp + testData[3].hcp - 28;

  //     testData[2].hcp = testData[2].hcp - difference / 2;
  //     testData[3].hcp = testData[3].hcp - difference / 2;
  //   }

  //   const highestHCP = Math.max(testData[2].hcp, testData[3].hcp);
  //   const substract = testData[2].hcp + testData[3].hcp - 28;

  //   if (testData[2].hcp === highestHCP && testData[2].hcp !== testData[3].hcp) {
  //     testData[2].hcp = testData[2].hcp - substract;
  //   }

  //   if (testData[3].hcp === highestHCP && testData[2].hcp !== testData[3].hcp) {
  //     testData[3].hcp = testData[3].hcp - substract;
  //   }
  // }

  console.log(testData);

  //SLUT - FIXAR LAG HCP PÅ MAX 28

  testData.forEach((player) => {
    slopeHandicapList.push(
      hcpSlope(player.hcp, slopeRating, courseRating, banansPar)
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
