interface DaoContractSchema {
    address: string;
    owner:string;
    heading:string,
    memberCount:number,
    additionalInfo:string,
    thumbnail:string,
 }

 interface promptSchema{
    id:number,
    DOE:number,
 }

 const daoTableName="dao_table_314159_80";
 const promptTableName="";