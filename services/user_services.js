const UserModel = require("../models/user_model");

exports.getUsers = (req, res) => {
  // const name = req.body.name;
  // console.log(name);

  res.send();
};

exports.createUser = (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const mobile = req.body.mobile;
  const user_type = req.body.user_type;
  UserModel.create({ name, image, dob, gender, mobile, user_type })
    .then((user) => res.status(201).json({ data: user }))
    .catch((err) => res.status(400).send(err));

  // const newUser = new UserModel({ name });
  // newUser
  //   .save()
  //   .then((doc) => {
  //     res.json(doc); // send document
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   });
};
