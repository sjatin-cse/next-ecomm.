// import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Product from "@/components/Product";
import { initMongoose } from "@/lib/mongoose";
import { findAllProduct } from "./api/Products";
import Layout from "@/components/Layout";

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  // const [productsInfo, setProductsInfo] = useState([]);
  const [phrase, setPhrase] = useState("");
  const categoriesNames = [...new Set(products.map((p) => p.category))];
  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  }
  return (
    <Layout>
      <div className="bg-gray-700">
        <input
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          placeholder="Search for Products..."
          className="bg-gray-100 w-full py-2 px-4 rounded-xl text-black"
        />

        <div className="text-white ">
          {/* <br className="black" /> */}
          {categoriesNames.map((categoryName) => (
            <div key={categoryName}>
              {products.find((p) => p.category === categoryName) && (
                <div>
                  <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
                  <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                    {products
                      .filter((p) => p.category === categoryName)
                      .map((productsInfo) => (
                        <div key={productsInfo._id} className="px-5 snap-start">
                          <Product {...productsInfo} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProduct();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
