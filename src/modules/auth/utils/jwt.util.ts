const extractTokenFromRequestHeader = (req) => {
  const authTokenSegments = (req.headers.authorization || '').split(' ');

  return authTokenSegments.length === 2 ? authTokenSegments[1] : null;
};

export { extractTokenFromRequestHeader };
