const isValid = (value) => {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  if (typeof value === "number" && value.toString().trim().length === 0)
    return false;
  return true;
};

const isValidRequestBody = (requestBody) => {
  if (Object.keys(requestBody).length) return true;
  return false;
};

const isValidString = (String) => {
  return /\d/.test(String);
};

const isValidPhoneNumber = (PhoneNumber) => {
  return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(PhoneNumber);
};

const isValidLink = (amazonLink) => {
  return /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g.test(
    amazonLink
  );
};

const isValidEmail = (Email) => {
  return /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email);
};

const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}

module.exports = {
  isValid,
  isValidRequestBody,
  isValidString,
  isValidPhoneNumber,
  isValidEmail,
  isValidLink,
  isValidobjectId
};
