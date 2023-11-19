const { Router } = require("express");
const {
  getClinics,
  createClinic,
  getClinic,
  updateClinic,
  deleteClinic,
  updateClinicImages,
  uploadClinicImages,
  resizeClinicImages,
} = require("../services/clinic_services");
const {
  getClinicValidator,
  createClinicValidator,
  updateClinicValidator,
  deleteClinicValidator,
} = require("../validator/clinic_validator");
const {
  isUserAuthenticated,
  isAuthorized,
} = require("../services/auth_services");

const clinicRouter = Router();

clinicRouter.route("/").get(getClinics).post(
  isUserAuthenticated,
  isAuthorized("user"),
  // uploadClinicImages,
  // resizeClinicImages,
  createClinicValidator,
  createClinic
);
clinicRouter
  .route("/:id")
  .get(getClinicValidator, getClinic)
  .put(
    // uploadClinicImages,
    // resizeClinicImages,
    updateClinicValidator,
    updateClinic
  )
  .delete(deleteClinicValidator, deleteClinic);
clinicRouter.route("/updateimages/:id").put(
  uploadClinicImages,
  resizeClinicImages,
  // updateClinicValidator,
  updateClinicImages
);
module.exports = clinicRouter;
