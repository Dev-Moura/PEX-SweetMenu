import ProductCard from "../components/ProductCard"
import { sweets } from "../data/sweet"

export default function Menu() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Cardápio de Doces
      </h2>

      <div className="grid gap-4">
        {sweets.map((item, index) => (
          <ProductCard
            key={index}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>

    </div>
  )
}