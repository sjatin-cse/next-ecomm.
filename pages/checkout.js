import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductContext";
import { Sedgwick_Ave } from "@next/font/google";
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addItem = (id) => {
    setSelectedProducts((prev) => [...prev, id]);
  };
  const subItem = (id) => {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  };

  const deliveryPrice = 15;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfos.find((p) => p._id === id)?.price || 0;
      subtotal += price;
    }
  }
  let total = subtotal + deliveryPrice;

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("api/Products?ids=" + uniqIds.join(","))
      .then((res) => res.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);
  return (
    <Layout>
      {!productsInfos.length && <div>No Products selected</div>}

      {productsInfos.length &&
        productsInfos.map((productInfo) => {
          const amount = selectedProducts.filter(
            (id) => id === productInfo._id
          ).length;
          if (amount === 0) return;

          return (
            <div key={productInfo._id} className="flex mb-5">
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img
                  className="w-24"
                  src={"products/" + productInfo.picture}
                  alt=""
                />
              </div>
              <div className="pl-4">
                <h3 className="font-bold text-lg">{productInfo.name}</h3>
                <p className="text-sm">{productInfo.description}</p>
                <div className="flex">
                  <div className="grow">${productInfo.price}</div>
                  <button
                    onClick={() => subItem(productInfo._id)}
                    className="border border-emerald-500 px-2 text-white rounded-lg"
                  >
                    -
                  </button>
                  <span className="px-2">
                    {
                      selectedProducts.filter((id) => id === productInfo._id)
                        .length
                    }
                  </span>
                  <button
                    onClick={() => addItem(productInfo._id)}
                    className="bg-emerald-500 px-2 text-white rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      <form action="/api/checkout" method="POST">
        <div className="mt-4 text-black">
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Street address, number"
          />
          <input
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="City and postal code"
          />
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            placeholder="Your Name"
          />
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            placeholder="Email Address "
          />
        </div>
        <div className="mt-4">
          <div className="flex my-3 ">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="">${subtotal}</h3>
          </div>
          <div className="flex my-3 ">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="">${deliveryPrice}</h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="">${total}</h3>
          </div>
        </div>
        <input
          type="hidden"
          name="products"
          value={selectedProducts.join(",")}
        />

        <button
          type="submit"
          className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg"
        >
          Pay ${total}
        </button>
      </form>
    </Layout>
  );
}
