import { Menu, Item } from "../models/db.js";
import menuValidationSchema from "../requests/menu.js";
import itemValidationSchema from "../requests/item.js";

export default class userRequests {
    async addMenu(req, res) {
        try {
            const { title, description } = req.body;

            const { error } = menuValidationSchema.validate({ title, description });
            if (error) {
                return res.status(422).json({
                    status: false,
                    message: error.details[0].message,
                    data: null
                });
            }

            const existingMenu = await Menu.findOne({ title });
            if (existingMenu) {
                return res.status(400).json({
                    status: false,
                    message: "Menu title already exists",
                    data: null
                });
            }

            const newMenu = await Menu.create({ title, description });
            
            return res.status(201).json({
                status: true,
                message: "Menu created successfully",
                data: newMenu
            });

        } catch (error) {
            console.error("Menu creation error:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null
            });
        }
    }

    async addItem(req, res) {
        try {
            const { name, description, price, menu, category } = req.body;

            const { error } = itemValidationSchema.validate({
                name, description, price, menu, category
            });

            if (error) {
                return res.status(422).json({
                    status: false,
                    message: error.details[0].message,
                    data: null
                });
            }

            const menuExists = await Menu.findById(menu);
            if (!menuExists) {
                return res.status(404).json({
                    status: false,
                    message: "Menu not found",
                    data: null
                });
            }

            const newItem = await Item.create({
                name,
                description,
                price: parseFloat(price),
                menu,
                category
            });

            return res.status(201).json({
                status: true,
                message: "Item added successfully",
                data: newItem
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Failed to add item",
                data: null
            });
        }
    }

    async getMenu(req, res) {
        try {
            const menus = await Menu.find().lean();
            res.status(200).json({
                status: true,
                message: "Menus retrieved successfully",
                data: menus
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Failed to retrieve menus",
                data: null
            });
        }
    }

    async getItems(req, res) {
        try {
            const { menu } = req.query;
            
            const menuDoc = await Menu.findOne({ title: menu });
            if (!menuDoc) {
                return res.status(404).json({
                    status: false,
                    message: "Menu not found",
                    data: null
                });
            }

            const items = await Item.find({ menu: menuDoc._id }).lean();
            res.status(200).json({
                status: true,
                message: "Items retrieved successfully",
                data: items
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Failed to retrieve items",
                data: null
            });
        }
    }
}