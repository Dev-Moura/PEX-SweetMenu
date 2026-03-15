type Props = {
  name: string
  price: string
}

export default function ServiceCard({ name, price }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex justify-between">
      <span>{name}</span>
      <span className="text-blue-600 font-semibold">{price}</span>
    </div>
  )
}