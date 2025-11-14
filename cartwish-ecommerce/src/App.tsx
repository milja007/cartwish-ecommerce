import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import {useState ,useEffect} from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
const App = () => {
  const[user,setUser]= useState<JwtPayload | null>(null)
  useEffect(()=>{
    try{
      const jwt = localStorage.getItem("token")
      if(jwt) {
        const jwtUser = jwtDecode<JwtPayload>(jwt)
        if(Date.now() >= jwtUser.exp * 1000){
          localStorage.removeItem("token")
          location.reload()
        } else {
          setUser(jwtUser)
        }
      }
    }catch{
      // Prešutno ignoriši greške ako token ne postoji ili je nevažeći
    }
    },[])
  return (
    <div className="app">
      <Navbar user={user} />
      <main>
        <Routing />
      </main>
    </div>
  );
};

export default App;
