import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">

      <Link
        to="/"
        className="font-bold text-blue-600"
      >
        Long River
      </Link>

      <div className="flex gap-6">

        <Link to="/">Home</Link>

        <Link to="/menu">Cardápio</Link>

        <Link to="/servicos">Papelaria</Link>

      </div>

    </nav>
  )
}