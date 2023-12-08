export const productValidation = (product: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors:string[]
}) => {

    const errors:
        {
            title: string;
            description: string;
            imageURL: string;
            price: string;
            colors:string;
        } = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors:""
    };

    const validURL = (/\.(jpeg|jpg|gif|png|bmp)$/i).test(product.imageURL);
    

    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = "Product title must be between 10 and 80 characters!";
    }
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errors.description = "Product description must be between 10 and 900 characters!";
    }
    if(!product.imageURL.trim() || !validURL ){
        errors.imageURL = "Invalid image url!";
    }

    if(!product.price.trim() || isNaN(Number(product.price))){
        errors.price = "Valid price is required!";
    }
    if(product.colors.length === 0){
        errors.colors="Product color is required!";
    }
    return errors;
}