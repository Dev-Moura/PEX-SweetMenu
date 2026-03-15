import ServiceCard from "../components/ServiceCard"
import { services } from "../data/services"

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Papelaria & Serviços
      </h2>

      <div className="grid gap-4">
        {services.map((item, index) => (
          <ServiceCard
            key={index}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

    </div>
  )
}