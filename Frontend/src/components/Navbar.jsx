import {Link} from "react-router-dom"
import {useAuth} from "../context/AuthContext.jsx"
import {Button} from "@/components/ui/button"

const Navbar = () => {
    const {user,logout} = useAuth();
    console.log(user)
    
  return (
     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Job<span className="text-gray-800">Connect</span>
      </Link>
<div className="flex items-center gap-4">
  <Link to="/jobs" className="hover:text-blue-600"><Button variant="outline" size="sm">Jobs</Button></Link>

  {!user ? (
    <>
      <Link to="/login" className="hover:text-blue-600">
        <Button variant="outline" size="sm">Login</Button>
      </Link>
      <Link to="/signup" className="hover:text-blue-600">
        <Button variant="outline" size="sm">Register</Button>
      </Link>
    </>
  ) : (
    <>
      {user.role === "recruiter" ? (
        <Link to="/recruiter-dashboard">
          <Button variant="default" size="sm">Dashboard</Button>
        </Link>
      ) : (
        <Link to="/jobseeker-dashboard">
          <Button variant="default" size="sm">Dashboard</Button>
        </Link>
      )}
      {user.role === "recruiter" && (
        <Link to ="/create-job">
             <Button variant="outline" className="hover:text-blue-600" size="sm">
        Post Job
      </Button>

        </Link>
      )}
      <Button variant="outline" className="hover:text-blue-600" size="sm" onClick={logout}>
        Logout
      </Button>
    </>
  )}
</div>


    </nav>
  )
}

export default Navbar
