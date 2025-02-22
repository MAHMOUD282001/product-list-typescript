
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const imageUrlRegex =  /^(ftp|http|https):\/\/[^ "]+$/;
  const validImgUrl = imageUrlRegex.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 50
  ) {
    errors.title = "Title must be between 10 characters and 50 characters";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 80
  ) {
    errors.description =
      "Description must be between 10 characters and 80 characters";
  }

  if (!product.imageURL.trim() || !validImgUrl) {
    errors.imageURL = "Please enter a valid image URL";
  }
  
  if(!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Please enter a valid price";
  }
  
  return errors;
};
