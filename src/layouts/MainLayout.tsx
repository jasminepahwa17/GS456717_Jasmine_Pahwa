import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
  return (

      <div className="flex-1 flex flex-col h-screen text-black min-w-[1080px] w-screen mx-auto">
        <Navbar />
        <div className="flex h-[calc(100vh-5rem)]">
          <Sidebar />
          <main className="p-4 bg-gray-200 overflow-y-auto flex-1">
          <Outlet />
        </main>
        </div>
      </div>
  )
}

export default MainLayout
