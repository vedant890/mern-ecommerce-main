const Order = require("../models/Order");

exports.create = async (req, res) => {
  try {
    const created = new Order(req.body);
    await created.save();
    res.status(201).json(created);
  } catch (error) {
    console.error("Create Order Error:", error);
    return res
      .status(500)
      .json({ message: "Error creating an order, please try again later" });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Order.find({ user: id }).sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    console.error("Get Orders By User Error:", error);
    return res
      .status(500)
      .json({ message: "Error fetching orders, please try again later" });
  }
};

exports.getAll = async (req, res) => {
  try {
    let skip = 0;
    let limit = 0;

    if (req.query.page && req.query.limit) {
      const pageSize = parseInt(req.query.limit);
      const page = parseInt(req.query.page);
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Order.countDocuments();
    const results = await Order.find({}).skip(skip).limit(limit).sort({ createdAt: -1 });

    res.header("X-Total-Count", totalDocs);
    res.status(200).json(results);
  } catch (error) {
    console.error("Get All Orders Error:", error);
    res.status(500).json({ message: "Error fetching orders, please try again later" });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({ message: "Error updating order, please try again later" });
  }
};
