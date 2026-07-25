const sendSuccess = (res, data, status = 200) => {
  return res.status(status).json(data);
};

const sendPaginated = (res, data, total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  return res.status(200).json({
    data,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages,
  });
};

const sendError = (res, message, status = 500, fields = undefined) => {
  const response = {
    error: {
      message,
    },
  };
  
  if (fields) {
    response.error.fields = fields;
  }
  
  return res.status(status).json(response);
};

export {
  sendSuccess,
  sendPaginated,
  sendError,
};
