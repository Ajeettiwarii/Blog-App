import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { Route ,Routes} from 'react-router-dom';
import AddBlog from './components/AddBlog'; 
import BlogDetail  from './components/BlogDetail';   
import Blogs from './components/Blogs'; 
import Auth from './components/Auth';  
import UserBlogs from './components/UserBlogs'; 
import { useSelector } from 'react-redux/es/hooks/useSelector'; 
import { useDispatch } from 'react-redux';
import { authActions } from './store';




function App() {    
  const dispath=useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn) 
  console.log(isLoggedIn);   

  useEffect( ( )=>{   
    if(localStorage.getItem("userId")){ 
      dispath(authActions.login())

    }

  }, [dispath]);
  return (
   <React.Fragment>
    <header>
      <Header/>
    </header> 
    <main>
      <Routes>
        { !isLoggedIn ?<Route path='/auth' element={<Auth/>}/>   :  
        <>
        <Route path='/blogs' element={<Blogs/>}/>  
        <Route path='/myBlogs' element={<UserBlogs/>}/>  
        <Route path='/myBlogs/:id' element={<BlogDetail/>}/>   
        <Route path='/blogs/add' element={<AddBlog/>}/>  </>}    
        
      </Routes>
    </main>
   </React.Fragment>
  );
}

export default App;
