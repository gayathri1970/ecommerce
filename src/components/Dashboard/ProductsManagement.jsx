import React, { useState, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const ProductsManagement = () => {
  const { adminProducts, addProduct, updateProduct, deleteProduct } = useContext(ShopContext);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "men",
    new_price: "",
    old_price: "",
    image: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ name: "", category: "men", new_price: "", old_price: "", image: "" });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      new_price: product.new_price,
      old_price: product.old_price,
      image: product.image
    });
    setShowForm(true);
  };

  return (
    <div className="products-management">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Products Management</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          Add New Product
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <div className="dashboard-section">
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kids</option>
              </select>
            </div>
            <div className="form-group">
              <label>New Price</label>
              <input
                type="number"
                className="form-control"
                value={formData.new_price}
                onChange={(e) => setFormData({...formData, new_price: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Old Price</label>
              <input
                type="number"
                className="form-control"
                value={formData.old_price}
                onChange={(e) => setFormData({...formData, old_price: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                className="form-control"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="/path/to/image.jpg"
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-success">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button 
                type="button" 
                className="btn-delete"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setFormData({ name: "", category: "men", new_price: "", old_price: "", image: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="dashboard-section">
        <h2>All Products ({adminProducts.length})</h2>
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Old Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td>{product.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                <td>${product.new_price}</td>
                <td>${product.old_price}</td>
                <td>
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
                        deleteProduct(product.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsManagement;