const fistBumpers = {};

const main = async() => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const fistBumpContractFactory = await hre.ethers.getContractFactory('FistBumpPortal');
  const fistBumpContract = await fistBumpContractFactory.deploy();
  await fistBumpContract.deployed();
  
  console.log("Contract deployed to:", fistBumpContract.address);
  console.log("Contract deployed by:", owner.address);
  
  let fistBumpCount;
  fistBumpCount = await fistBumpContract.getTotalFistBumps();
  
  let fistBumpTxn = await fistBumpContract.fistBump();
  await fistBumpTxn.wait();
  fistBumpers[owner.address] = fistBumpers[owner.address]++ || 1

  fistBumpCount = await fistBumpContract.getTotalFistBumps();

  fistBumpTxn = await fistBumpContract.connect(randomPerson).fistBump();
  await fistBumpTxn.wait();
  fistBumpers[randomPerson.address] = fistBumpers[randomPerson.address] + 1 || 1

  fistBumpTxn = await fistBumpContract.connect(randomPerson).fistBump();
  await fistBumpTxn.wait();
  fistBumpers[randomPerson.address] = fistBumpers[randomPerson.address] + 1 || 1

  fistBumpCount = await fistBumpContract.getTotalFistBumps();
  console.log("All current fist bumpers", fistBumpers)
};


const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();