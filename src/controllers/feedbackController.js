const feedbackModel = require("../models/feedbackModel");

exports.createfeedback = async (req, res) => {
  const requestBody = req.body;

  const feedback = await feedbackModel.create(requestBody);
  res.status(201).send({ status: true, message: "Success", data: feedback });
};

exports.updatefeedback = async function (req, res) {
  const feedbackId = req.params.id;

  const updateData = await feedbackModel.findById({ _id: feedbackId });
// console.log(feedbackId)
  if (!updateData) {
    return res.status(404).send({ status: false, message: "No data found" });
  }
  const requestBody = req.body
  if (Object.keys(req.body) == 0) {
      return res.status(400).send({ status: false, message: 'please provide data for updation' })
  }
  const updatefeedback = await feedbackModel.findOneAndUpdate(
    { _id: feedbackId },
    { ...requestBody },
    { new: true }
  );

  return res
    .status(200)
    .send({
      status: true,
      message: "feedback updated successfully",
      data: updatefeedback,
    });
};

exports.deleteFeedback = async (req, res) => {
  try {
    await feedbackModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: true, msg: "feedback deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: "server error" });
  }
};
