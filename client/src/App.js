import React, { useContext, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Form from './components/Form';
import PostContainer from './components/postContainer/PostContainer';
import PostPage from './components/PostPage/PostPage'
import Register from './components/register/Register';
import ContextState from './components/Context/ContextState';
import Login from './components/login/Login'
import States from './components/Context/States';
import Alert from './components/alert/Alert';
import Spinner from './components/spinner/Spinner';
import Dashboard from './components/dashboard/Dashboard';
import ProtectiveRoute from './components/protectiveRoutes/ProtectiveRoute';
import ProtectiveRoute2 from './components/protectiveRoutes/ProtectRoute2';
import './css/footer.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


const App = () => {
  const errorContext = useContext(ContextState);
  const [Loading, setLoading] = useState(false);
  useEffect(() => { errorContext.checkLoggedIn() }, [])
  return (
    <>


      <div className='bg-light' style={{ minHeight: "700px" }}>
        <Navbar />
        {errorContext.error.message === "" ? <div></div> : <Alert message={errorContext.error.message} />}
        <div className="container" >
          <Router>
            <Routes>
              <Route exact path="/" element={<PostContainer />} />
              {/* Not able to access when user is not able to login */}
              <Route exact path="/post" element={<ProtectiveRoute><Form /></ProtectiveRoute>} />
              <Route exact path="/dashboard/*" element={<ProtectiveRoute><Dashboard /></ProtectiveRoute>} />
              {/* <Route exact path="/post" element={<Form  />}/> */}
              {/* Not able to access these paths when the user is logged In */}
              <Route exact path="/register" element={<ProtectiveRoute2><Register /></ProtectiveRoute2>} />
              <Route exact path="/login" element={<ProtectiveRoute2><Login /></ProtectiveRoute2>} />
              <Route exact path="/:id" element={<PostPage />} />
            </Routes>
          </Router>
        </div>
      </div>
        <div className="bg-dark" style={{ height: "50px"}}>
        </div>





    </>
  )
}

export default App;
