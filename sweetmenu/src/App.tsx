import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navibar"

import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Services from "./pages/Services"

export default function App() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/menu"
          element={<Menu />}
        />

        <Route
          path="/servicos"
          element={<Services />}
        />

      </Routes>

    </div>
  )
}