// utils/response.js
function successResponse(res, data, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
}

function errorResponse(res, error, statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    error: typeof error === 'string' ? error : error.message,
    code: error.code || 'ERROR',
    timestamp: new Date().toISOString(),
  });
}

module.exports = {
  successResponse,
  errorResponse,
};