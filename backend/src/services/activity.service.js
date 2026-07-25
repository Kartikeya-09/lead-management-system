import Activity from '../models/Activity.model.js';

const getActivitiesForLead = async (leadId) => {
  return Activity.find({ leadId })
    .sort({ createdAt: -1 })
    .populate('performedBy', 'name email');
};

const getAllActivities = async (page = 1, limit = 10) => {
  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    Activity.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('performedBy', 'name email')
      .populate('leadId', 'name company'),
    Activity.countDocuments(),
  ]);

  return { data, total, page, limit };
};

export {
  getActivitiesForLead,
  getAllActivities,
};
