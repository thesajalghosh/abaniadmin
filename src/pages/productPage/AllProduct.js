import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./ProductPage.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const AllProducts = () => {
  const [product, setProduct] = useState(null);

  const getAllProduct = async () => {
    try {
      const productResponse = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );

      if (productResponse.data.success) {
        setProduct(productResponse?.data?.products);
        toast.success("Products fetched successfully");
      } else {
        toast.error("Failed to load products list");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="products-list-container">
      <div className="products-list-header">
        <h2>Active Inventory List</h2>
        <p>
          Viewing {product ? product.length : 0} registered products in the store database.
        </p>
      </div>

      <div className="card p-4">
        <div className="products-grid-admin">
          {product && product.length > 0 ? (
            product.map((e) => (
              <ProductCard key={e._id} element={e} />
            ))
          ) : (
            <div className="no-products-prompt">
              No products found in the catalog. Create one to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;