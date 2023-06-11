function saveFiles(contract, name) {
    const fs = require("fs");
    
    var contractsDir = __dirname + "/../contractsData";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.address }, undefined, 2)
    );
  
    var contractArtifact = artifacts.readArtifactSync(name);
  
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
    );
    

    //SAVING TO FUNDRAISER
     contractsDir = __dirname + "/../../client/assets/contractData";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.address }, undefined, 2)
    );
  
     contractArtifact = artifacts.readArtifactSync(name);
  
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
    );
    
    // //SAVING TO BACKEND
    // contractsDir = __dirname + "/../../relayer/contractData";
  
    // if (!fs.existsSync(contractsDir)) {
    //   fs.mkdirSync(contractsDir);
    // }
  
    // fs.writeFileSync(
    //   contractsDir + `/${name}-address.json`,
    //   JSON.stringify({ address: contract.address }, undefined, 2)
    // );
  
    //  contractArtifact = artifacts.readArtifactSync(name);
  
    // fs.writeFileSync(
    //   contractsDir + `/${name}.json`,
    //   JSON.stringify(contractArtifact, null, 2)
    // );
    
  }

module.exports= saveFiles;  