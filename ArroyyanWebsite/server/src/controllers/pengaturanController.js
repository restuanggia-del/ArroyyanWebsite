import Pengaturan from "../models/Pengaturan.js";

export const getPengaturan = async (req, res) => {
  try {
    let data = await Pengaturan.findOne();
    if (!data) data = await Pengaturan.create({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePengaturan = async (req, res) => {
  try {
    let data = await Pengaturan.findOne();
    if (data) {
      data = await Pengaturan.findByIdAndUpdate(data._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      data = await Pengaturan.create(req.body);
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
