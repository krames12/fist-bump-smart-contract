const fistBumpers = {};

const main = async() => {
  const fistBumpContractFactory = await hre.ethers.getContractFactory('FistBumpPortal');
  const fistBumpContract = await fistBumpContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1')
  });
  await fistBumpContract.deployed();
  
  console.log("Contract deployed to:", fistBumpContract.address);

  // Get Contract balance
  let contractBalance = await hre.ethers.provider.getBalance(fistBumpContract.address);
  console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));
  
  let fistBumpCount;
  fistBumpCount = await fistBumpContract.getTotalFistBumps();
  console.log(fistBumpCount.toNumber());
  
  let fistBumpTxn = await fistBumpContract.fistBump("Totally a test message");
  await fistBumpTxn.wait();

  const [_, randomPerson] = await hre.ethers.getSigners();
  fistBumpTxn = await fistBumpContract.connect(randomPerson).fistBump("A random message");
  await fistBumpTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(fistBumpContract.address);
  console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));

  fistBumpCount = await fistBumpContract.getAllFistBumps();
  console.log("All current fist bumpers", fistBumpCount)
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