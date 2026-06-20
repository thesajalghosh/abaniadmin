import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiInbox, FiTag, FiDollarSign, FiShoppingBag, FiTruck, FiFileText } from "react-icons/fi";
import "./ProductPage.css";

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
      productData.append("shipping", shiping);

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
    <div className="create-product-container-full">
      <div className="card p-5">
        <h2 className="product-creator-title">
          <FiInbox size={22} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          Create New Product
        </h2>
        
        <form className="product-form-grid" onSubmit={handleCreateProduct}>
          <div className="form-column">
            <div className="form-group mb-3">
              <label className="form-label">
                <FiTag size={12} style={{ marginRight: '6px' }} />
                Product Name
              </label>
              <input
                type="text"
                value={name}
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((ele) => (
                  <option key={ele._id} value={ele._id}>
                    {ele.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row-half">
              <div className="form-group mb-3">
                <label className="form-label">
                  <FiDollarSign size={12} style={{ marginRight: '6px' }} />
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  placeholder="Enter price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">
                  <FiShoppingBag size={12} style={{ marginRight: '6px' }} />
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">
                <FiTruck size={12} style={{ marginRight: '6px' }} />
                Shipping Availability
              </label>
              <select
                value={shiping}
                onChange={(e) => setShiping(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select shipping
                </option>
                <option value="0">No, Local Pick Up Only</option>
                <option value="1">Yes, Standard Shipping Available</option>
              </select>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group mb-3">
              <label className="form-label">Product Banner Photo</label>
              <div className="product-upload-dropzone">
                <input
                  type="file"
                  id="product-photo-upload"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="file-input-hidden"
                  required
                />
                <label htmlFor="product-photo-upload" className="product-upload-label">
                  {photo ? (
                    <div className="product-preview-box">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product preview"
                        className="product-upload-preview"
                      />
                      <span className="product-preview-filename">{photo.name}</span>
                    </div>
                  ) : (
                    <div className="product-upload-prompt">
                      <FiUploadCloud size={32} className="upload-icon" />
                      <span className="upload-text-primary">Click to select photo</span>
                      <span className="upload-text-secondary">JPG, PNG, or WEBP up to 8MB</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">
                <FiFileText size={12} style={{ marginRight: '6px' }} />
                Description
              </label>
              <textarea
                value={description}
                placeholder="Write a clear, detailed product description"
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ resize: 'none' }}
              />
            </div>
          </div>

          <div className="form-footer-action">
            <button type="submit" className="btn btn-primary submit-product-btn">
              Create Product Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
