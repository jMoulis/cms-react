const ApiResponse = require('../services/ApiResponse');
const PageModel = require('../models/PageModel');

module.exports = {
  index: async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
      const pages = await PageModel.find({});
      return apiResponse.success(200, { data: pages });
    } catch (error) {
      return apiResponse.failure(422, error, { message: error.message });
    }
  },
  create: async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
      if (!req.body) throw new Error('No data sent');
      const data = await PageModel.create(req.body);
      return apiResponse.success(201, { data });
    } catch (error) {
      return apiResponse.failure(422, error, { message: error.message });
    }
  },
  read: async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
      return apiResponse.success(200, { message: 'read' });
    } catch (error) {
      return apiResponse.failure(422, error, { message: error.message });
    }
  },
  update: async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
      return apiResponse.success(204, { message: 'update' });
    } catch (error) {
      return apiResponse.failure(422, error, { message: error.message });
    }
  },
  delete: async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
      return apiResponse.success(204, { message: 'delete' });
    } catch (error) {
      return apiResponse.failure(422, error, { message: error.message });
    }
  },
};
