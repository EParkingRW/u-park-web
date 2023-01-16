const Keys = {
  REACT_APP_ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN,
  USER_INFO:process.env.USER_INFO,
  DEFAULT_API:process.env.DEFAULT_API,
  ISSERVER: typeof window === 'undefined',
};

export default Keys;
