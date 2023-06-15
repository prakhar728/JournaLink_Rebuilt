export interface DaoContractSchema {
    address: string;
    name:string;
    heading:string,
    memberCount:number,
    additionalInfo:string,
    thumbnail:string,
 }

 export interface promptSchema{
   promptid:number,
   contractaddress:string,
   heading:string,
   description:string
 }
 export const daoTableName="dao_table_314159_155";
 export const promptTableName="prompt_table_314159_156";