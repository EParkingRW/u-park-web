export const formatJoiErorr = (error: string) => {
  if (!error) {
    return;
  }
  const message = error.replace(/"/g, '').replace(/Id/g, '');
  return message.charAt(0).toUpperCase() + message.slice(1);
};

export const convertToSlug = (param: string) => {
  const url = param
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return url;
};

export const removeQuote = (text: string | null) => {
  if (!text) {
    return null;
  }
  return text.replace(/"/g, '');
};

