const validate = async function (decoded, request, h) {
  console.log(decoded);
  try {
    return { isValid: true };
  } catch (error) {
    console.log(error.message);
    return { isValid: false };
  }
};

module.exports = { validate };
