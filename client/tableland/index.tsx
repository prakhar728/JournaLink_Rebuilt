export interface DaoContractSchema {
    address: string;
    name:string;
    heading:string,
    memberCount:number,
    additionalInfo:string,
    thumbnail:string,
 }

 export interface promptSchema{
    id:number,
    DOE:number,
 }

 export const daoTableName="dao_table_314159_80";
 export const promptTableName="prompt_table_314159_122";