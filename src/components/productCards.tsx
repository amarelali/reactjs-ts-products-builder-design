import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product: IProduct;
}
const productCards = ({ product }: IProps) => {
  const { title, imageURL, description, price, category, colors } = product;

  const renderColors = colors.map((color) => (
    <CircleColor color={color} key={color} />
  ));

  return (
    <div className="max-w-sm border rounded-md p-2 flex flex-col">
      <Image
        imageURL={imageURL}
        alt={"product img"}
        className={"rounded-md mb-2"}
      />
      <h3>{title} </h3>
      <p>{txtSlicer(description)}</p>
      <div className="flex items-center my-4 space-x-2">{renderColors}</div>
      <div className="flex items-center justify-between">
        <span>${price}</span>
        <Image
          imageURL={category.imageURL}
          alt={category.name}
          className={"w-10 h-10 rounded-full "}
        />
      </div>
      <div className="flex items-center justify-between space-x-2 my-5">
        <Button
          className="bg-indigo-700"
          onClick={() => {
            console.log("click");
          }}
          width="w-full"
        >
          Edit
        </Button>
        <Button
          className="bg-red-700"
          onBlur={() => {
            console.log("blur");
          }}
          width="w-full"
        >
          Delete
        </Button>
        <Button className="bg-gray-700">Cancel</Button>
        <Button className="bg-yellow-700">Loading</Button>
      </div>
    </div>
  );
};
export default productCards;
// rtsc
