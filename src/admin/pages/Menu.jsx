import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase/firebaseConfig.js";
import { img_placeholder } from "../../assets/index.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { DataTable, TableSkeleton } from "../components/adminComponentIndex.js";
import { Button } from "../../components/component_index.js";

function MenuPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "main",
    description: "",
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  // Track existing image URL when editing, so we don't wipe it if no new image is selected
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  // Key trick: changing this forces the file input to fully re-mount, clearing its internal state
  const [fileInputKey, setFileInputKey] = useState(0);
  // Track blob URL separately for cleanup
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

// Cleanup blob URLs to prevent memory leaks
const blobUrlRef = useRef(null);

useEffect(() => {
  if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current); // always current

  if (form.image) {
    const newUrl = URL.createObjectURL(form.image);
    blobUrlRef.current = newUrl; // ref for cleanup
    setBlobUrl(newUrl);          // state for re-render
  } else {
    blobUrlRef.current = null;
    setBlobUrl(null);
  }

  return () => {                 // unmount cleanup
    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
  };
}, [form.image]);

  const fetchItems = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "menuItems"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItems(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null; // null = no new file chosen

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.warn("Cloudinary not configured");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.secure_url || null;
  };

  const resetForm = () => {
    setForm({ name: "", price: "", category: "main", description: "", image: null });
    setEditItemId(null);
    setExistingImageUrl("");
    // Increment key to force file input to re-mount (fixes "won't accept new file" bug)
    setFileInputKey((k) => k + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      // Only upload if a new file was selected
      const uploadedUrl = await uploadImage(form.image);

      // Decide final image URL:
      const finalImageUrl = uploadedUrl !== null
        ? uploadedUrl
        : existingImageUrl;

      const itemData = {
        name: form.name,
        price: parseFloat(form.price),
        category: form.category,
        description: form.description,
        image: finalImageUrl,
        createdAt: new Date(),
      };

      if (editItemId) {
        await updateDoc(doc(db, "menuItems", editItemId), itemData);
        setItems((prev) =>
          prev.map((item) =>
            item.id === editItemId ? { id: editItemId, ...itemData } : item
          )
        );
        toast.success("Item updated successfully!");
      } else {
        const docRef = await addDoc(collection(db, "menuItems"), itemData);
        setItems((prev) => [...prev, { id: docRef.id, ...itemData }]);
        toast.success("Item added successfully!");
      }

      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Error saving item: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id) => {
    // Custom toast confirmation — replaces browser confirm()
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium text-sm">Delete this item?</p>
          <p className="text-xs text-gray-500">This action cannot be undone.</p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await deleteDoc(doc(db, "menuItems", id));
                  setItems((prev) => prev.filter((item) => item.id !== id));
                  toast.success("Item deleted successfully!");
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to delete item");
                }
              }}
              className="flex-1 bg-red-500 text-white text-xs px-3 py-1.5 rounded active:scale-95 active:translate-y-0.5 transition-transform"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex-1 border text-xs px-3 py-1.5 rounded text-gray-600 hover:bg-gray-100 active:scale-95 active:translate-y-0.5 transition-transform"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleEdit = (item) => {
    setEditItemId(item.id);
    setExistingImageUrl(item.image || "");
    setForm({
      name: item.name,
      price: item.price,
      category: item.category || "main",
      description: item.description,
      image: null,
    });
    setFileInputKey((k) => k + 1);
    toast("Editing: " + item.name, { icon: "\u270f\ufe0f", duration: 2000 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = ["all", "main", "drink", "dessert"];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !searchText ||
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase()) ||
      String(item.price).includes(searchText);
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });


  // Preview: show newly selected file blob, or existing URL when editing, or nothing
  const imagePreview = blobUrl
    ? blobUrl
    : existingImageUrl || null;

  const columns = [
    {
      label: "Image",
      key: "image",
      render: (val) =>
        val ? (
          <img
            src={val}
            alt="menu"
            className="w-16 h-16 md:w-18 md:h-16 lg:w-20 lg:h-18 object-cover rounded-md"
          />
        ) : (
          <img
            src={img_placeholder}
            alt="No image"
            className="w-16 h-16 md:w-18 md:h-16 lg:w-20 lg:h-18 object-cover rounded-md"
          />
        ),
    },
    { label: "Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Price (Rs)", key: "price" },
    { label: "Description", key: "description" },
    {
      label: "Actions",
      key: "actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded active:scale-95 active:translate-y-0.5 transition-transform"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded active:scale-95 active:translate-y-0.5 transition-transform"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Form */}
      <div className="bg-(--bg-color) p-5 md:p-8 lg:p-10 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          {editItemId ? "Edit Menu Item" : "Add Menu Item"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10">
          {/* Left side: fields + button */}
          <div className="flex-3 flex flex-col gap-4">
            {/* Row 1: Name + Category */}
            <div className="flex gap-2 md:gap-3 lg:gap-4">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="flex-1 border p-2 rounded focus:ring-2 focus:ring-(--button-hover-bg-color) focus:border-(--button-hover-bg-color) focus:outline-none"
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-24 md:w-28 lg:w-44 border p-2 rounded focus:ring-2 focus:ring-(--button-hover-bg-color) focus:border-(--button-hover-bg-color) focus:outline-none"
              >
                <option value="main">Main</option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>

            {/* Row 2: Price + Description */}
            <div className="flex gap-2 md:gap-3 lg:gap-4">
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-24 md:w-28 lg:w-44 border p-2 rounded focus:ring-2 focus:ring-(--button-hover-bg-color) focus:border-(--button-hover-bg-color) focus:outline-none"
              />
              <input
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="flex-1 border p-2 rounded focus:ring-2 focus:ring-(--button-hover-bg-color) focus:border-(--button-hover-bg-color) focus:outline-none"
              />
            </div>

            {/* Submit + Cancel buttons */}
            <div className="flex gap-2">
              <Button type="submit" disabled={uploading} className="text-white w-full mt-2">
                {uploading ? "Saving..." : editItemId ? "Update Item" : "Add Item"}
              </Button>
              {editItemId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border w-full mt-2 px-4 py-2 rounded text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Right side: image upload */}
          <div className="relative flex-2 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center p-4 cursor-pointer hover:border-(--button-hover-bg-color) transition w-full md:h-44">
            {/* key prop forces re-mount on reset/edit so browser clears its file cache */}
            <input
              key={fileInputKey}
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <p className="text-gray-400 text-center">
                Drag & drop image here or click to upload
              </p>
            )}
          </div>
        </form>
      </div>
     
      {/* Filters */}
      <div className="flex flex-row gap-4 mb-5 items-start md:items-center">
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-(--button-hover-bg-color) focus:border-(--button-hover-bg-color)"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-(--button-hover-bg-color) focus:border-(--button-hover-bg-color)"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton rows={5} cols={columns.length} />
      ) : (
        <DataTable title="Menu Items" columns={columns} rows={filteredItems} />
      )}
    </>
  );
}

export default MenuPage;
