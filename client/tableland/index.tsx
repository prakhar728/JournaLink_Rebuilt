export interface DaoContractSchema {
    address: string;
    name:string;
    heading:string,
    memberCount:number,
    additionalInfo:string,
    thumbnail:string,
    totalRewarded:string
 }

 export interface promptSchema{
   promptid:number,
   contractaddress:string,
   heading:string,
   description:string,
   DOE:string
 }
 export interface newsSchema{
  newsID:string,
  creatoraddress:string,
  headline:string,
  newsinfo:string,
  tags:string,
  thumbnail:string,
  videoURL:string,
  likes:number,
  DOC:string
 }
 export const daoTableName="dao_table_314159_223";
 export const promptTableName="prompt_table_314159_224";
 export const newsTableName= "news_table_314159_198";