import { memo } from "react";
import { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";
import Image from "./ui/Image";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openProductToEditModal: () => void;
  setProductToEditIndex: (index: number) => void;
  index: number;
  setProductToEditColors: (colors: string[]) => void;
  openProductToDeleteModal: () => void;
}

function ProductCard({
  product,
  setProductToEdit,
  openProductToEditModal,
  setProductToEditIndex,
  index,
  setProductToEditColors,
  openProductToDeleteModal
}: IProps) {
  const { title, description, imageURL, price, colors, category } = product;

  /*----------------------------------Handlers------------------------------------ */
  const handleEdit = () => {
    setProductToEdit(product);
    setProductToEditIndex(index);
    setProductToEditColors(colors);
    openProductToEditModal();
  };
  
  const handleDelete = () => {
    setProductToEdit(product);
    openProductToDeleteModal();
  }

  /*----------------------------------Render------------------------------------ */
  const RenderCircleColor = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  return (
    <div className="border p-3 rounded-md shadow-md">
      <Image
        imageUrl={imageURL}
        alt={title}
        className="rounded-md mb-2 h-52 w-full object-cover"
      />

      <h3 className="my-3">{title}</h3>
      <p>{txtSlicer(description, 100)}</p>

      <div className="flex gap-1 items-center flex-wrap my-3">
        {RenderCircleColor}
      </div>

      <div className="flex justify-between items-center my-5">
        <h4>{price}</h4>
        <Image
          imageUrl={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex justify-between items-center gap-3 mt-3">
        <Button classes="bg-blue-500" width="w-full" onClick={handleEdit}>
          Edit
        </Button>
        <Button classes="bg-red-500" width="w-full" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default memo(ProductCard);
