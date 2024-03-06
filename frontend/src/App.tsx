import { Outlet } from 'react-router';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Navbar from './components/Navbar';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextType } from './context/UserContext';

function App() {
  const {setUser} = useContext(UserContext) as UserContextType;

  useEffect(()=>{
    verifyAuth();
  }, []);

  async function verifyAuth() {
    var res = await fetch(process.env.REACT_APP_DATA_API+"sessions/logged_in",
      {
        method: 'GET',
        credentials: 'include',
        headers: 
        { 
          'Content-Type': 'application/json',
        }
      }
    );

    handleResponse(await res.json(), res.status);
  }
  function handleResponse(data: any, status:number){
    if (status === 200 && data.id){
        setUser(data);
    }
  }


  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
