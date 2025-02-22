import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./errors/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import Select from "./components/ui/Select";
import { TProduct } from "./types";
function App() {
  const defaultProductObject: IProduct = {
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
  /*------------------------------State------------------------------------*/
  const [isOpen, setIsOpen] = useState(false);
  const [isProductToEditOpen, setIsProductToEditOpen] = useState(false);
  const [isProductToDeleteOpen, setIsProductToDeleteOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [inputsErrors, setInputsErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObject);

  const [productToEditIndex, setProductToEditIndex] = useState(0);

  const [productToEditColors, setProductToEditColors] = useState<string[]>(
    productToEdit.colors
  );

  /*------------------------------Handler------------------------------------*/
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const openProductToEditModal =  useCallback(() => setIsProductToEditOpen(true), []);
  const closeProductToEditModal = () => setIsProductToEditOpen(false);

  const openProductToDeleteModal = useCallback(() => setIsProductToDeleteOpen(true), []);
  const closeProductToDeleteModal = () => setIsProductToDeleteOpen(false);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      
      setProduct(prev => ({
        ...prev,
        [name]: value,
      }));
      setInputsErrors({
        ...inputsErrors,
        [name]: "",
      });
    },
    []
  );

  const handleProductToEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });

    setInputsErrors({
      ...inputsErrors,
      [name]: "",
    });
  };

  function closeHandler(): void {
    setProduct(defaultProductObject);
    closeModal();
  }

  function closeEditModalHandler(): void {
    setProductToEdit(defaultProductObject);
    closeProductToEditModal();
  }

  function handleColorChange(color: string): void {
    setTempColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((prevColor) => prevColor !== color);
      } else {
        return [...prev, color];
      }
    });
  }

  function handleEditModalColorChange(color: string): void {
    console.log(color);
    productToEditColors.includes(color)
      ? setProductToEditColors((prev) =>
          prev.filter((prevColor) => prevColor !== color)
        )
      : setProductToEditColors((prev) => [...prev, color]);
  }

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    if (Object.values(errors).some((error) => error !== "")) {
      setInputsErrors(errors);
      return;
    }

    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
    ]);

    setProduct(defaultProductObject);
    setTempColors([]);
    closeModal();
  }

  function submitProductToEditHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const { title, description, imageURL, price } = productToEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    if (Object.values(errors).some((error) => error !== "")) {
      setInputsErrors(errors);
      return;
    }

    const updatedProducts = [...products];
    updatedProducts[productToEditIndex] = {
      ...productToEdit,
      colors: productToEditColors,
    };

    setProducts(updatedProducts);

    setProductToEdit(defaultProductObject);
    setTempColors([]);
    closeEditModalHandler();
  }

  const removeProductHandler = (): void => {
    const id = productToEdit.id;
    console.log(id);
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    closeProductToDeleteModal();
  };
  /*------------------------------Rendring------------------------------------*/
  const RenderProducts = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openProductToEditModal={openProductToEditModal}
      setProductToEditIndex={setProductToEditIndex}
      index={index}
      setProductToEditColors={setProductToEditColors}
      openProductToDeleteModal={openProductToDeleteModal}
    />
  ));

  const RenderFormInputsList = formInputsList.map((input) => (
    <div className="flex flex-col mb-3" key={input.id}>
      <label
        className="mb-1 text-sm font-medium text-gray-700"
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        name={input.name}
        id={input.id}
        value={product[input.name]}
        onChange={handleInputChange}
      />

      <ErrorMessage message={inputsErrors[input.name]} />
    </div>
  ));

  const RenderCircleColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => handleColorChange(color)}
    />
  ));

  const RenderColorsCodes = tempColors.map((color) => (
    <span
      className="text-white px-3 py-1 rounded-md bg-red-500"
      key={color}
      style={{ backgroundColor: color }}
    >
      {color}
    </span>
  ));

  const RenderProductToEditFormInputs = (
    id: string,
    name: TProduct,
    label: string,
    type: string
  ) => (
    <div className="flex flex-col mb-3" key={id}>
      <label className="mb-1 text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <Input
        type={type}
        name={name}
        id={id}
        value={productToEdit[name]}
        onChange={handleProductToEditInputChange}
      />

      <ErrorMessage message={inputsErrors[name]} />
    </div>
  );

  const RenderEditModalCircleColor = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => handleEditModalColorChange(color)}
    />
  ));

  const RenderEditModalColorsCodes = productToEditColors.map((color) => (
    <span
      className="text-white px-3 py-1 rounded-md bg-red-500"
      key={color}
      style={{ backgroundColor: color }}
    >
      {color}
    </span>
  ));

  return (
    <main className="container mx-auto">
      <div className="flex align-center justify-center">
        <Button classes="bg-blue-500 w-[200px] mt-7" onClick={openModal}>
          Add Product
        </Button>
      </div>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
        {RenderProducts}
      </div>

      {/* ---------------------------------ADD PRODUCT MODAL------------------------------------ */}
      <Modal close={closeModal} isOpen={isOpen} title="ADD NEW PRODUCT">
        <form onSubmit={submitHandler}>
          {RenderFormInputsList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex gap-1 items-center flex-wrap my-3">
            {RenderCircleColor}
          </div>

          <div className="flex gap-1 items-center flex-wrap my-3">
            {RenderColorsCodes}
          </div>

          <div className="flex justify-between items-center gap-3">
            <Button classes="bg-blue-500" width="w-full" type="submit">
              Submit
            </Button>

            <Button classes="bg-gray-300" width="w-full" onClick={closeHandler}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* ---------------------------------EDIT PRODUCT MODAL------------------------------------ */}
      <Modal
        close={closeProductToEditModal}
        isOpen={isProductToEditOpen}
        title="Edit PRODUCT"
      >
        <form onSubmit={submitProductToEditHandler}>
          {RenderProductToEditFormInputs(
            "title",
            "title",
            "Product Title",
            "text"
          )}
          {RenderProductToEditFormInputs(
            "description",
            "description",
            "Product Description",
            "text"
          )}
          {RenderProductToEditFormInputs(
            "imageURL",
            "imageURL",
            "Product imageURL",
            "text"
          )}
          {RenderProductToEditFormInputs(
            "price",
            "price",
            "Product Price",
            "number"
          )}

          <Select
            selected={productToEdit.category}
            setSelected={(value) => {
              setProductToEdit({ ...productToEdit, category: value });
            }}
          />

          <div className="flex gap-1 items-center flex-wrap my-3">
            {RenderEditModalCircleColor}
          </div>

          <div className="flex gap-1 items-center flex-wrap my-3">
            {RenderEditModalColorsCodes}
          </div>

          <div className="flex justify-between items-center gap-3">
            <Button classes="bg-blue-500" width="w-full" type="submit">
              Submit
            </Button>

            <Button
              classes="bg-gray-300"
              width="w-full"
              onClick={closeEditModalHandler}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        close={closeProductToDeleteModal}
        isOpen={isProductToDeleteOpen}
        title="Are you sure you want to delete this product?"
      >
        <div className="flex justify-between items-center gap-3">
          <Button
            classes="bg-blue-500"
            width="w-full"
            type="submit"
            onClick={removeProductHandler}
          >
            Confirm
          </Button>

          <Button
            classes="bg-gray-300"
            width="w-full"
            onClick={closeProductToDeleteModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
