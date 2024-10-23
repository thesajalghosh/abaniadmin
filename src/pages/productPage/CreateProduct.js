import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProductPage.css";  // Import the CSS file

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shiping, setShiping] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-all-category`
      );
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", selectedCategory);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        }
      );

      if (data.success) {
        toast.success("Product created successfully");
        navigate("/product-page");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="create-product-container">
      <h1 className="create-product-header">Create Product</h1>
      <form className="create-product-form" onSubmit={handleCreateProduct}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((ele) => (
            <option key={ele.name} value={ele._id}>
              {ele.name}
            </option>
          ))}
        </select>
        <div className="file-input-wrapper">
          <label>
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
        </div>
        {photo && (
          <div className="text-center">
            <img
              src={URL.createObjectURL(photo)}
              alt="product"
              className="img img-responsive"
            />
          </div>
        )}
        <input
          type="text"
          value={name}
          placeholder="Write a name"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          value={description}
          placeholder="Write a description"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          value={quantity}
          placeholder="Enter quantity"
          className="form-control"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="text"
          value={price}
          placeholder="Enter price"
          className="form-control"
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          placeholder="Select shipping"
          className="form-select mb-3"
          onChange={(e) => setShiping(e.target.value)}
        >
          <option value="" disabled>
            Select shipping
          </option>
          <option value="0">NO</option>
          <option value="1">YES</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
