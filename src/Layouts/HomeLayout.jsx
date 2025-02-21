import { useContext } from "react"
import AllTask from "../components/AllTask"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import { AuthContext } from "../provider/AuthProvider"
import SetStart from "../components/SetStart"

const HomeLayout = () => {
  const{user}=useContext(AuthContext)
  return (
    <div>
        <NavBar />
        <main className="min-h-screen">
        {
          user?(<AllTask />):(<><SetStart /></>)
        }
        </main>
        <Footer />
    </div>
  )
}

export default HomeLayout