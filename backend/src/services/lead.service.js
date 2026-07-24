import Lead from '../models/Lead.js';

/**
 * Service to handle Lead domain operations
 */
export const createLeadService = async (leadData) => {
  const lead = await Lead.create(leadData);
  return lead;
};

export const getLeadsService = async (queryParams) => {
  const { page = 1, limit = 10, status, search } = queryParams;

  // Base filter: exclude soft deleted leads
  const filter = { isDeleted: false };

  // Status Filter
  if (status) {
    filter.status = status;
  }

  // Search Filter (name or email)
  if (search) {
    const searchRegex = new RegExp(search, 'i');
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex }
    ];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Lead.countDocuments(filter)
  ]);

  return {
    leads,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum) || 1
    }
  };
};

export const getLeadByIdService = async (id) => {
  const lead = await Lead.findOne({ _id: id, isDeleted: false });
  return lead;
};

export const updateLeadStatusService = async (id, status) => {
  const lead = await Lead.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { status },
    { new: true, runValidators: true }
  );
  return lead;
};

export const softDeleteLeadService = async (id) => {
  const lead = await Lead.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  );
  return lead;
};

export const getLeadStatsService = async () => {
  const baseMatch = { isDeleted: false };

  const [totalLeads, newLeads, contactedLeads, closedLeads] = await Promise.all([
    Lead.countDocuments(baseMatch),
    Lead.countDocuments({ ...baseMatch, status: 'New' }),
    Lead.countDocuments({ ...baseMatch, status: 'Contacted' }),
    Lead.countDocuments({ ...baseMatch, status: 'Closed' })
  ]);

  return {
    totalLeads,
    newLeads,
    contactedLeads,
    closedLeads
  };
};
