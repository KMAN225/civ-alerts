function errorResponse(res, status, message, extra = {}) {
  return res.status(status).json({ message, ...extra });
}

function successResponse(res, data, status = 200) {
  return res.status(status).json(data);
}

module.exports = { errorResponse, successResponse };
