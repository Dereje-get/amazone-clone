import React, { useEffect, useState } from 'react'
import classes from './Result.module.css'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { producturl } from '../../API/EndPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from "../../Components/Loader/Loader";

function Result() {
  const [results, setResults] = useState([])
  const {isLoading, setIsLoading} =useState(false)
  const { categoryName } = useParams()
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${producturl}/products/category/${categoryName}`).then((res) => {
      setResults(res.data)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err);
      setIsLoading(false)
    })
  },[])
  
    return (
      <Layout>
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>category/{categoryName}</p>
          <br />
          {
            isLoading? (<Loader/>) : (<div className={classes.products__container}>
            {results?.map((product) => (
              <ProductCard key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true} />
              ))}

            </div>
            )}
        </section>
      </Layout>
    );
}

export default Result