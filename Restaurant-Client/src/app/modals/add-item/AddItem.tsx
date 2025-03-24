import React, { useState, ChangeEvent } from "react";
import styles from "./additem.module.css";
import { MdClose } from "react-icons/md";
import axios from "axios";

interface ModalProps {
    state: React.Dispatch<React.SetStateAction<boolean>>;
    refreshItems: () => void;
    menuTitle: string;
}

const categories = ['Drinks', 'Foods', 'Brunch', 'Snacks', 'Dessert'];

const AddItem: React.FC<ModalProps> = ({ state, refreshItems, menuTitle }) => {
    const handleClose = () => state(false);
    
    const [record, setRecord] = useState({
        name: "",
        description: "",
        price: "",
        menu: menuTitle,
        category: "Brunch"  // Default category
    });

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setRecord({ ...record, [e.target.name]: e.target.value });
    }

    function handleSubmit() {
        axios.post("http://localhost:5000/api/items", {
            ...record,
            price: parseFloat(record.price)  // Convert price to number
        })
        .then(() => {
            refreshItems();
            state(false);
        })
        .catch((error) => alert(error.response?.data?.message || "Error adding item"));
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.closeIcon}>
                <MdClose onClick={handleClose} />
            </div>
            <div className={styles.inputContainer}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter Item Name" 
                    value={record.name} 
                    onChange={handleChange} 
                />
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Enter Description" 
                    value={record.description} 
                    onChange={handleChange} 
                />
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Enter Price" 
                    value={record.price} 
                    onChange={handleChange} 
                />
                <select 
                    name="category"
                    value={record.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default AddItem;