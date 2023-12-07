import { ChangeEvent, useState } from "react";
import ProductCards from "./components/productCards";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import { formInputsList, productList } from "./data";
import Input from "./components/ui/Input";

const App = () =>  {
  /* State */
  const [product, setProduct] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  /* State */

  /* handler */

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value,name} = event.target;
    setProduct({
      ...product,
      [name]:value
    })

  };

  /* handler */

  /* render */

  const renderProductsList = productList.map((product) => (
    <ProductCards key={product.id} product={product} />
  ));
  const renderFormInputsList = formInputsList.map((input) => (
    <div className="flex flex-col mb-3">
      <label
        htmlFor={input.id}
        className="mb-1 text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
        <Input
        id={input.id}
        type="text"
        name={input.name}
        onChange={onChangeHandler}
        value={product[input.name]}
      />

    </div>
  ));
  return (
    <>
      <main className="container mx-auto">
        <Button
          className="bg-blue-400 hover:bg-blue-800"
          onClick={() => openModal()}
        >
          Add
        </Button>

        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
          {renderProductsList}
        </div>

        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="Add a new product"
        >
          <form className="space-y-3">
            {renderFormInputsList}
            <div className="flex space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">
                Submit
              </Button>
              <Button
                className="bg-red-700 hover:bg-red-800"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </>
  );
};

export default App;
