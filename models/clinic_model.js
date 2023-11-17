const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name required"] },
    images: [String],
    lat: Number,
    lng: Number,
    priority: Number, // for advertising purposes
    address: String,
    floor: Number,
    elevator: Boolean,
    description: { type: String },
    specialty: { type: String, required: [true, "specialty required"] },
    mobile: [String],
    subSpecialty: [String],
    services: [String],
    visitingTimes: [String],
    visits: { type: Number, default: 0 },
    firstVisitPrice: { type: Number },
    secondVisitPrice: { type: Number },
    ratingAverage: { type: Number, min: 0, max: 5 },
    ratingQuantity: { type: Number, default: 0 },
    mainDoctor: {
      type: mongoose.Schema.ObjectId,
      required: [true, "main doctor required"],
      ref: "User",
    },
    otherDoctors: { type: [mongoose.Schema.ObjectId], ref: "User" },
  },
  { timestamps: true }
);
function setImagesUrl(doc) {
  const imagesList = [];
  if (doc.images) {
    doc.images.forEach((image) => {
      const imgUrl = `${process.env.BASE_URL}/clinic/${image}`;
      imagesList.push(imgUrl);
    });
    doc.images = imagesList;
  }
}

clinicSchema.post("save", (doc) => {
  setImagesUrl(doc);
});

clinicSchema.post("init", (doc) => {
  setImagesUrl(doc);
});

const ClinicModel = mongoose.model("Clinic", clinicSchema);
module.exports = ClinicModel;
