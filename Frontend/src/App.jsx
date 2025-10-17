import { Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CreateJob from "./pages/CreateJob"
import RecruiterDashboard from "./pages/Dashboard/RecruiterDashboard"
import JobSeekerDashboard from "./pages/Dashboard/JobSeekerDashboard"
import Jobs from "./pages/Jobs"
import EditJob from "./pages/EditJob"
function App() {
return(
<>
<Navbar/>
<div className="container mx-auto p-4">
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/jobs" element={<Jobs/>}/>
   <Route path="/create-job" element={<CreateJob />} />
<Route path="/jobs/edit/:id" element={<EditJob />} />

    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/recruiter-dashboard" element={<RecruiterDashboard/>}/>
    <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard/>}/>
  </Routes>
  </div>
  </>
)
}

export default App
