"use client";
import React, { useEffect, useState } from "react";
import styles from "./menu.module.css";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddMenu from "../../modals/add-menu/AddMenu";
import Items from "../items/Items";

interface MenuItem {
    _id: string;
    title: string;
}

function Menu() {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

    const fetchMenus = () => {
        axios.get("http://localhost:5000/api/menus")
            .then((response) => setMenus(response.data.data || []))
            .catch((error) => console.error("Error fetching menus:", error));
    };

    useEffect(fetchMenus, []);

    return (
        <div className={styles.container}>
            {showAddMenu && <AddMenu state={setShowAddMenu} refreshMenus={fetchMenus} />}
            <div className={styles.buttonContainer}>
                {menus.map((menu) => (
                    <button 
                        key={menu._id} 
                        className={styles.item} 
                        onClick={() => setSelectedMenu(menu.title)}
                    >
                        {menu.title}
                    </button>
                ))}
                <IoIosAddCircleOutline 
                    className={styles.addMenu} 
                    onClick={() => setShowAddMenu(true)} 
                />
            </div>
            {selectedMenu && <Items menuTitle={selectedMenu} />}
        </div>
    );
}

export default Menu;