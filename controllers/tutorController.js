const Service = require('../models/Service');

// Tạo dịch vụ mới cho gia sư
exports.createService = async (req, res) => {
  const { subject, description, hourlyRate, videoURL } = req.body;
  try {
    const service = new Service({
      tutorId: req.user._id,
      subject,
      description,
      hourlyRate,
      videoURL
    });
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy danh sách các dịch vụ (công khai)
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().populate('tutorId', 'name');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Các hàm khác có thể thêm vào tại đây cho các chức năng khác của gia sư
