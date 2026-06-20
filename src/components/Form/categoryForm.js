import React from "react";
import { FiUploadCloud, FiTag } from "react-icons/fi";

const CategoryForm = ({ handleSubmit, setValue, value, setPhoto, photo }) => {
  return (
    <form onSubmit={handleSubmit} className="category-form-inner">
      <div className="form-group mb-3">
        <label className="form-label">
          <FiTag size={12} style={{ marginRight: '6px' }} />
          Category Name
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-4">
        <label className="form-label">Category Banner Photo</label>
        <div className="upload-dropzone">
          <input
            type="file"
            id="category-file-input"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="file-input-hidden"
          />
          <label htmlFor="category-file-input" className="upload-zone-label">
            <FiUploadCloud size={32} className="upload-icon" />
            <span className="upload-text-primary">
              {photo ? photo.name : "Click to select a photo"}
            </span>
            <span className="upload-text-secondary">
              PNG, JPG, or WEBP up to 5MB
            </span>
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary submit-category-btn">
        Save Category
      </button>
    </form>
  );
};

export default CategoryForm;