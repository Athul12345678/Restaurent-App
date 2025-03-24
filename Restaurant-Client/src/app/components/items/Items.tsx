"use client";
import React, { useEffect, useState } from "react";
import styles from "./items.module.css";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddItem from "../../modals/add-item/AddItem";

interface Item {
    _id: string;
    name: string;
    price: number;
    description: string;
}

interface Props {
    menuTitle?: string;
}

const Items = ({ menuTitle = "" }: Props) => {
    const [items, setItems] = useState<Item[]>([]);
    const [showAddItem, setShowAddItem] = useState(false);

    const fetchItems = () => {
        if (!menuTitle) return;
        
        axios.get(`http://localhost:5000/api/items?menu=${menuTitle}`)
            .then((response) => setItems(response.data.data || []))
            .catch((error) => console.error("Error fetching items:", error));
    };

    useEffect(fetchItems, [menuTitle]);

    return (
        <div className={styles.container}>
                <div className={styles.menu}>
                    {items.map((item) => (
                        <div key={item._id} className={styles.menuItem}>
                            <div className={styles.nameAndPrice}>
                                <h3 className={styles.itemName}>{item.name}</h3>
                                <span className={styles.space}></span>
                                <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
                            </div>
                            <p className={styles.itemDescription}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        
    );
};

export default Items;