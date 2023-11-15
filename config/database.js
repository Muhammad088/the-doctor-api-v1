const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log("conn :>> ", conn.connection.host);
  });
  // .catch((err) => {
  //   console.error("err :>> ", err);
  //   process.exit(1);
  // });
};

module.exports = dbConnection;
