export type UrlType = 
{
    id? : number ;
    route : string;
    link : string;
    view : number;
    email : string | null | undefined
}

export type UserType = 
{
    id? : string;
    email : string;
    password : string;
}