import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "./CategoryList.css";
import Modal from "../../components/Modal/Modal";
import CategoryForm from "../../components/Form/categoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState(null);
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [photo, setPhoto] = useState("");

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-all-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryData = new FormData();
      categoryData.append("name", name);
      categoryData.append("photo", photo);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        categoryData,
        {
          headers: {
            authorization: token,
          },
          "Content-Type": "application/json",
        }
      );
      if (data.success) {
        toast.success("Category created successfully");
        getAllCategory();
        setName("");
        setPhoto("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating new category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleEdit = (ele) => {
    setModal(true);
    setUpdatedName(ele.name);
    setSelected(ele._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected}`,
        { name: updatedName },
        {
          headers: {
            authorization: token,
          },
          "Content-Type": "application/json",
        }
      );

      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setModal(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = (ele) => {
    setDeleteModal(true);
    setSelected(ele._id);
  };

  const handleDeleteCall = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${selected}`,
        {
          headers: {
            authorization: token,
          },
          "Content-Type": "application/json",
        }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setDeleteModal(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="category-manager-container">
      {modal && (
        <Modal
          heading={<span>Edit Category</span>}
          setClose={setModal}
          body={
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
              setPhoto={setPhoto}
              photo={photo}
            />
          }
        />
      )}
      {deleteModal && (
        <Modal
          heading={<span>Delete Category</span>}
          setClose={setDeleteModal}
          body={<div>Are you sure you want to delete this category?</div>}
          footer={
            <div className="d-flex justify-content-end" style={{ gap: '10px' }}>
              <button className="btn btn-secondary" onClick={() => setDeleteModal(false)}>
                No
              </button>
              <button className="btn btn-danger" onClick={handleDeleteCall}>
                Yes
              </button>
            </div>
          }
        />
      )}

      <div className="category-layout-grid">
        <div className="category-form-section">
          <div className="card p-4">
            <h2 className="section-title">Create Category</h2>
            <CategoryForm
              name={name}
              setValue={setName}
              handleSubmit={handleSubmit}
              setPhoto={setPhoto}
              photo={photo}
            />
          </div>
        </div>

        <div className="category-list-section">
          <div className="card p-4">
            <h2 className="section-title">Manage Categories</h2>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" style={{ width: '240px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((ele) => (
                    <tr key={ele._id}>
                      <td className="category-name-cell">{ele.name}</td>
                      <td>
                        <div className="action-buttons-cell">
                          <button className="btn btn-primary btn-action-edit" onClick={() => handleEdit(ele)}>
                            <FiEdit2 size={13} />
                            <span>Edit</span>
                          </button>
                          <button className="btn btn-danger btn-action-delete" onClick={() => handleDelete(ele)}>
                            <FiTrash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
