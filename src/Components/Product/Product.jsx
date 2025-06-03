import React, {useEffect, useState} from 'react';
import axios from 'axios'
import ProductCard from './ProductCard';
import classes from "./Product.module.css";
import Loader from '../../Components/Loader/Loader'

function Product() {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading]   = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get("https://fakestoreapi.com/products").then((res) => {
            setProducts(res.data);
            setLoading(false)
            console.log(res.data);
            }).catch((error)=>{
                console.log(error);
                setLoading(false)
            })
    }, [])
    return (
        <>
            {
                isLoading? (<Loader/>): (<section className={classes.products__container}>
                {products?.map((singleProduct) => (
                <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
                ))}
            </section>)
            }
            
        </>
    );
}

export default Product

// function Product() {
//   const [products, setProducts] = useState([]); //initialize products as an empty array to ensure .map() works on the first render, as .map() works on empty arrays — it just returns an empty array.
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("https://fakestoreapi.com/products/")
//         .then((res) => {
//           console.log(res);
//         setProducts(res.data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.log(error);
//         setError("Failed to load products.");
//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <section className={classes.products_container}>
//           {products?.map((singleProduct) => (
//             <ProductCard product={singleProduct} key={singleProduct.id} />
//           ))}
//         </section>
//       )}
//         {/* <h1> Hello there</h1> */}
//     </>
//   );
// }

// export default Product;