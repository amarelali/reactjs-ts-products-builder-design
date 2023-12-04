import { useState } from "react";
import ProductCards from "./components/productCards";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import { productList } from "./data";

const App = () => {
  /* State */
  const [isOpen, setIsOpen] = useState(false);
  /* State */

  /* handler */

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  /* handler */

  /* render */

  const renderProductsList = productList.map((product) => (
    <ProductCards key={product.id} product={product} />
  ));
  return (
    <>
      <main className="container mx-auto">
      <Button className="bg-blue-400 hover:bg-blue-800" onClick={()=> openModal()}>Add</Button>

        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
          {renderProductsList}
        </div>

        <Modal isOpen={isOpen} closeModal={closeModal} title="Add a new product">
          <div className="flex space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button className="bg-red-700 hover:bg-red-800"  onClick={()=> closeModal()}>Cancel</Button>
          </div>
        </Modal>
      </main>
    </>
  );
};

export default App;
