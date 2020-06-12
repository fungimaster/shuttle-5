const shcp = (players) => {
  let playerData = players;
  //console.log("shcp -> playerData", playerData)
  let slopeHandicapList = [];

  //FIXAR LAG hcp PÅ MAX 28
  function max28perTeam(hcp1, hcp2) {
    let newHcp1 = hcp1;
    // console.log("functionmax28perTeam -> newHcp1", newHcp1);
    let newHcp2 = hcp2;
    // console.log("functionmax28perTeam -> newHcp2", newHcp2);
    // if (hcp1 + hcp2 <= 28) {
    //   return { newHcp1, newHcp2 };
    // }
    // if (hcp1 === hcp2) {
    //   const difference = hcp1 + hcp2 - 28;
    //   newHcp1 = hcp1 - difference / 2;
    //   newHcp2 = hcp2 - difference / 2;
    // }
    // const highestHCP = Math.max(hcp1, hcp2);
    // const substract = hcp1 + hcp2 - 28;
    // if (hcp1 === highestHCP && hcp1 !== hcp2) {
    //   console.log("functionmax28perTeam -> hcp1", hcp1);
    //   newHcp1 = hcp1 - substract;
    //   console.log("functionmax28perTeam -> substract", substract);
    //   console.log("functionmax28perTeam -> newHcp1", newHcp1);
    // }
    // if (hcp2 === highestHCP && hcp1 !== hcp2) {
    //   newHcp2 = hcp2 - substract;
    // }
    return { newHcp1, newHcp2 };
  }

  (function () {
    let { newHcp1, newHcp2 } = max28perTeam(
      playerData[0].hcp,
      playerData[1].hcp
    );
    playerData[0].hcp = newHcp1;
    playerData[1].hcp = newHcp2;
  })();

  (function () {
    let { newHcp1, newHcp2 } = max28perTeam(
      playerData[2].hcp,
      playerData[3].hcp
    );
    playerData[2].hcp = newHcp1;
    playerData[3].hcp = newHcp2;
  })();

  //slope-hcp
  playerData.forEach((player) => {
    slopeHandicapList.push(player.shcp);
  });

  // let hcpSlopeReduced = slopeHandicapList.map((hcpSlope) =>  hcpSlope * 0.9);

  let hcpSlopeReduced = slopeHandicapList.reduce((total, amount) => {
    total.push(Math.sign(amount) === 1 ? amount * 0.9 : amount * 1.1)
    return total
  }, [])

  //console.log("shcp -> hcpSlopeReduced", hcpSlopeReduced)


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

export { shcp };
