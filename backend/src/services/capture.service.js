import Lead from '../models/Lead.model.js';

const captureLead = async (payload) => {
  if (payload.email) {
    const existingLead = await Lead.findOne({ email: payload.email });
    if (existingLead) {
      const err = new Error('Lead with this email already exists');
      err.status = 409;
      throw err;
    }
  }

  const lead = new Lead({
    ...payload,
    status: 'New',
    assignedTo: null,
  });

  await lead.save();
  return lead.toJSON();
};

export {
  captureLead,
};
