import Footer from "./Footer";

export default function Layout({children}) {
  return (
    <div className="">
      <div className="bg-gray-700 text-white p-5 w-100">
        {children}
        <Footer />
      </div>
    </div>
  );
}
