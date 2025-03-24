import React, { useState, ChangeEvent } from "react";
import styles from "./addmenu.module.css";
import { MdClose } from "react-icons/md";
import axios from "axios";

const categories = ['Drinks', 'Foods', 'Brunch', 'Snacks', 'Dessert'];

interface ModalProps {
    state: React.Dispatch<React.SetStateAction<boolean>>;
    refreshMenus: () => void;
}

const AddMenu = ({ state, refreshMenus }: ModalProps) => {
    const [menuRecord, setMenuRecord] = useState({
        title: "",
        description: ""
    });

    const [menuItems, setMenuItems] = useState<{
        name: string;
        description: string;
        price: string;
        category: string;
    }[]>([]);

    const [currentItem, setCurrentItem] = useState({
        name: "",
        description: "",
        price: "",
        category: "Brunch"
    });

    const [loading, setLoading] = useState(false);

    const handleMenuChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMenuRecord({ ...menuRecord, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    const addMenuItem = () => {
        setMenuItems([...menuItems, currentItem]);
        setCurrentItem({
            name: "",
            description: "",
            price: "",
            category: "Brunch"
        });
    };

    const removeMenuItem = (index: number) => {
        setMenuItems(menuItems.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // 1. Create the menu
            const menuResponse = await axios.post("http://localhost:5000/api/menus", menuRecord);

            // 2. Add all items for this menu
            const itemPromises = menuItems.map(item => 
                axios.post("http://localhost:5000/api/items", {
                    ...item,
                    menu: menuResponse.data.data.id,
                    price: parseFloat(item.price)
                })
            );

            await Promise.all(itemPromises);
            
            refreshMenus();
            state(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.closeIcon}>
                <MdClose onClick={() => state(false)} />
            </div>
            
            <div className={styles.inputContainer}>
                <h3>Add Menu</h3>
                
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Menu Title" 
                    value={menuRecord.title} 
                    onChange={handleMenuChange} 
                    required
                />
                
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Menu Description" 
                    value={menuRecord.description} 
                    onChange={handleMenuChange} 
                    required
                />

                <h3>Add Menu Items</h3>
                
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Item Name" 
                    value={currentItem.name} 
                    onChange={handleItemChange} 
                />
                
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Item Description" 
                    value={currentItem.description} 
                    onChange={handleItemChange} 
                />
                
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Price" 
                    min="0"
                    step="0.01"
                    value={currentItem.price} 
                    onChange={handleItemChange} 
                />
                
                <select
                    name="category"
                    value={currentItem.category}
                    onChange={handleItemChange}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                
                <button onClick={addMenuItem}>Add Item</button>

                {menuItems.length > 0 && (
                    <div className={styles.menuItemsPreview}>
                        <h3>{menuRecord.title}</h3>
                        {menuItems.map((item, index) => (
                            <div key={index} className={styles.menuItemRow}>
                                <div className={styles.menuItemHeader}>
                                    <div className={styles.menuItemName}>{item.name}</div>
                                    <div className={styles.menuItemDots}></div>
                                    <div className={styles.menuItemPrice}>${item.price}</div>
                                </div>
                                <div className={styles.menuItemDescription}>
                                    {item.description}
                                </div>
                                <button 
                                    onClick={() => removeMenuItem(index)}
                                    className={styles.removeButton}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className={styles.submitButton}
                >
                    {loading ? 'Saving...' : 'Submit Menu'}
                </button>
            </div>
        </div>
    );
};

export default AddMenu;
