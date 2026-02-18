import { Contact } from "../model/Contact.js";

export const save = async (req, res) => {
  try {
    const { name, email, mobile, bloodgroup } = req.body;

    if (!name || !email || !mobile || !bloodgroup) {
      return res.json({
        message: "All fields are required",
        status: false,
      });
    }

    await Contact.create({
      name,
      email,
      mobile,
      bloodgroup,
    });

    res.json({
      message: "Contact Saved Successfully",
      status: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0) {
      return res.json({
        message: "No Contacts Available",
        status: false,
      });
    }

    res.json({
      message: "All Contacts",
      contacts,
      status: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.json({
        message: "Contact Not Found",
        status: false,
      });
    }

    res.json({
      message: "Contact Found",
      contact,
      status: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const updateContactById = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.json({
        message: "Contact Not Found",
        status: false,
      });
    }

    res.json({
      message: "Contact Updated Successfully",
      updatedContact,
      status: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
