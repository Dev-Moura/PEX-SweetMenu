import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen bg-stationery">
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl font-bold text-blue-600">
          Doceria & Papelaria Long River
        </h1>

        <p className="mt-4 text-gray-600">
          Doces artesanais e produtos de papelaria para o seu dia.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/menu"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Ver Cardápio
          </Link>

          <Link
            to="/servicos"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl"
          >
            Ver Papelaria
          </Link>
        </div>
      </section>
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600">Contato</h2>

          <p className="text-gray-600 mt-2">
            Entre em contato para fazer pedidos ou tirar dúvidas.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {/* WhatsApp */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-blue-600">WhatsApp</h3>

              <p className="text-gray-600 mt-2">(21) 99999-9999</p>
            </div>

            {/* Telefone */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-blue-600">Telefone</h3>

              <p className="text-gray-600 mt-2">(21) 3333-3333</p>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-blue-600">Email</h3>

              <p className="text-gray-600 mt-2">contato@longriver.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
