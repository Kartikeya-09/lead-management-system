import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
    },
    action: {
      type: String,
      enum: [
        'Lead Created',
        'Lead Updated',
        'Status Changed',
        'Assigned User Changed',
        'Note Added',
      ],
      required: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

activitySchema.index({ leadId: 1 });
activitySchema.index({ createdAt: -1 });

export default mongoose.model('Activity', activitySchema);
