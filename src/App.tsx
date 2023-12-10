import { ChangeEvent, FormEvent, useState } from "react";
import ProductCards from "./components/productCards";
import Button from "./components/ui/Button";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";

const App = () => {
  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  /* State */
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  /* State */

  /* handler */

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
      colors: tempColors,
    });

    setErrors({
      ...errors,
      [name]: "",
      colors: "",
    });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, price, imageURL } = product;
    let { colors } = product;
    colors = tempColors;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
      colors,
    });

    const noErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!noErrorMsg) {
      setErrors(errors);
      return;
    }
    console.log(errors);
    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors, category: selectedCategory },
      ...prev,
    ]);
    setProduct(defaultProduct);
    setTempColors([]);
    closeModal();
    console.log("send this product to our server");
  };
  const onCancel = () => {
    setProduct(defaultProduct);
    closeModal();
  };
  /* handler */

  /* render */

  const renderProductsList = products.map((product) => (
    <ProductCards key={product.id} product={product} />
  ));
  const renderFormInputsList = formInputsList.map((input) => (
    <div className="flex flex-col mb-3" key={input.id}>
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
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderColors = colors.map((color) => (
    <CircleColor
      color={color}
      key={color}
      onClick={() => {
        setErrors({
          ...errors,
          colors: "",
        });
        if (tempColors.includes(color)) {
          setTempColors(tempColors.filter((item) => item != color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
        setProduct((prev) => ({ ...prev, colors: tempColors }));
      }}
    />
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
          <form className="space-y-3" onSubmit={submitHandler}>
            {renderFormInputsList}
            <Select selected={selectedCategory} setSelected={setSelectedCategory} />
            <div className="flex space-x-1 items-center">{renderColors}</div>
            <div className="flex space-x-1 items-center flex-wrap">
              {tempColors.map((color) => (
                <span
                  key={color}
                  className="text-white rounded-md p-1 mb-1 mr-1 text-xs"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              ))}
            </div>
            <ErrorMessage msg={errors["colors"]} />
            <div className="flex space-x-3">
              <Button className="bg-indigo-700 hover:bg-indigo-800">
                Submit
              </Button>
              <Button
                className="bg-red-700 hover:bg-red-800"
                onClick={onCancel}
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
