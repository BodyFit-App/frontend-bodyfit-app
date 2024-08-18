const mockClient = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  upsert: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  fetch: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis(),
  range: jest.fn().mockReturnThis(),
};

export default mockClient;
