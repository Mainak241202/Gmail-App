import email from "../model/email.js";

export const saveSentEmails = (req, res) => {
  try {
    const Email = new email(req.body);
    Email.save();

    res.status(200).json("Email saved successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getEmails = async (req, res) => {
  try {
    let emails;
    if (req.params.type === "bin") {
      emails = await email.find({ bin: true });
    } else if (req.params.type === "mails") {
      emails = await email.find({});
    } else if (req.params.type === "starred") {
      emails = await email.find({ starred: true, bin: false });
    } else {
      emails = await email.find({ type: req.params.type });
    }
    return res.status(200).json(emails);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const moveEmailstoBin = async (req, res) => {
  try {
    await email.updateMany(
      { _id: { $in: req.body } },
      { $set: { bin: true, starred: false, type: "" } }
    );
    return res.status(200).json("Emails deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const togglestarredEmails = async (req, res) => {
  try {
    await email.updateOne(
      { _id: req.body.id },
      { $set: { starred: req.body.value } }
    );
    return res.status(200).json("Email is starred");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const deleteEmails = async (req, res) => {
  try {
    await email.deleteMany({ _id: { $in: req.body } });
    return res.status(200).json("Email deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
