import pool, { IncreaseView, SearchRoute } from "@/app/libs/db"
import Move from "../libs/Move";
interface PageProps {
    params: {
      url: string;
    };
  }


const page = async ({params}:PageProps) => {
      const route = params.url;
      ;
      const link = await SearchRoute(route);

      
      IncreaseView(route);
      return (
      <div>
        {
          link.rows.length === 0 ? <h1 className="text-center text-sky-600">404 Not Found</h1> : 
          <h1 className="text-center">You are getting redirected to : <span className="text-sky-600 ml-2">{link?.rows[0]?.link}</span></h1>
        }
      
      <Move url={link?.rows[0]?.link}/>
      </div>)
      
      

      

      
 
}

export default page