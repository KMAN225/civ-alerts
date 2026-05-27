function errorResponse(res, status, message) {
  return res.status(status).json({ message });
}

function successResponse(res, data, status = 200) {
  return res.status(status).json(data);
}

module.exports = { errorResponse, successResponse };
