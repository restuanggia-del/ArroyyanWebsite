import HomeServis from "../models/HomeServis.js";

export const getHomeServis = async (req, res) => {
  try {
    let data = await HomeServis.findOne();
    if (!data) data = await HomeServis.create({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHomeServis = async (req, res) => {
  try {
    let data = await HomeServis.findOne();
    if (data) {
      data = await HomeServis.findByIdAndUpdate(data._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      data = await HomeServis.create(req.body);
    }
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
