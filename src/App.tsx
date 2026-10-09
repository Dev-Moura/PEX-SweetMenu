import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Services from "@/pages/Services";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
