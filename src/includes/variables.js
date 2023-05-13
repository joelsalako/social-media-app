// export const appName = 'Social Media App';
// export const postStatus = ['Draft', 'Publish', 'Archive'];
// export const postCategories = [
//   'Education',
//   'Entertainment',
//   'Gaming',
//   'News',
//   'Other',
// ];

const appName = 'The Great App';
export { appName };

/**
 * List of Available Categories.
 */
export const categories = [
  { id: 'edu', text: 'Education' },
  { id: 'ent', text: 'Entertainment' },
  { id: 'gam', text: 'gaming' },
  { id: 'nws', text: 'News' },
  { id: 'oth', text: 'Other' },
];

/**
 * Get category bassed on its id.
 * @param {string} id
 * The id of the category to retrieves.
 * @returns
 * The category text.
 */
export const getCategory = (id) => {
  const item = categories.find((category) => category.id === id);
  return item?.text || 'None';
};

/**
 * List of possible status for a post.
 */
export const statuses = [
  { id: 'd', text: 'Draft' },
  { id: 'p', text: 'Published' },
  { id: 'a', text: 'Archived' },
];

/**
 * Get Status based on the status id.
 * @param {string} id
 * The id of the status to retrieve
 * @returns
 * The status text
 */
export const getStatus = (id) => {
  const item = statuses.find((status) => status.id === id);
  return item?.text || 'Not Set';
};
