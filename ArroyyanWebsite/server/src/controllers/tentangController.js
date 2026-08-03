import Tentang from "../models/Tentang.js";

export const getTentang = async (req, res) => {
  try {
    let data = await Tentang.findOne();
    if (!data) data = await Tentang.create({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTentang = async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) body.foto = `/uploads/${req.file.filename}`;

    let data = await Tentang.findOne();
    if (data) {
      data = await Tentang.findByIdAndUpdate(data._id, body, {
        new: true,
        runValidators: true,
      });
    } else {
      data = await Tentang.create(body);
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
