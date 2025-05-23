import { React, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import {
  FaEdit,
  FaTrash,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import axios from "axios";
import "./Treatment.css";
import { $siteURL } from "../../../common/SiteURL";
import { Alert } from "react-bootstrap";

const Treatment = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [treatmentListing, setTreatmentListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [variantForm, setVariantForm] = useState(false);
  const [treatmentName, setTreatmentName] = useState("");
  const [editableForm, setEditableForm] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [treatmentToDelete, setTreatmentToDelete] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [variantFormError, setVariantFormError] = useState("");

  // Update your fetchTreatments function to match the API response structure
  const fetchTreatments = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const parsedToken = JSON.parse(token);
      const response = await axios.get(`${$siteURL}/api/treatment`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      // Check if response.data exists and has the treatment array
      if (
        response.data &&
        response.data.treatment &&
        Array.isArray(response.data.treatment)
      ) {
        setTreatmentListing(response.data.treatment);
        setTotalEntries(response.data.treatment.length);
        setSuccess(true);
      } else {
        console.error("Unexpected API response format:", response.data);
        setError("Unexpected data format received from server");
        setTreatmentListing([]);
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error fetching treatments:", error);
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch treatment data"
      );
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
      }
      setTreatmentListing([]);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, [currentPage, entriesPerPage]);

  // We are fetching the treatment categories data
  const [treatmentCategoriesData, setTreatmentCategoriesData] = useState("");
  const fetchTreatmentCategories = async () => {
    try {
      const response = await axios.get(`${$siteURL}/api/category`);
      setTreatmentCategoriesData(response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    fetchTreatmentCategories();
  }, []);

  // Handle delete treatment
  const handleDelete = async (id) => {
    if (!id) {
      setErrorMessage("Invalid treatment ID");
      setDeleteAlert(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Authentication token not found");
        setDeleteAlert(false);
        return;
      }

      const parsedToken = JSON.parse(token);
      await axios.delete(`${$siteURL}/api/treatment/${id}`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setDeleteAlert(false);
      fetchTreatments();
    } catch (error) {
      console.error("Error deleting treatment:", error);
      setErrorMessage(
        error?.response?.data?.message || "Error deleting treatment"
      );
      setDeleteAlert(false);
    }
  };

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Calculate filtered entries and pagination data before rendering
  const filteredEntries = treatmentListing.filter(
    (treatment) =>
      treatment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.service_type
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      treatment.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  const [pricingAndDurationVariants, setPricingAndDurationVariants] = useState([
    {},
  ]);
  const [variantPriceTypes, setVariantPriceTypes] = useState(["free"]);
  const [variantNames, setVariantNames] = useState(["service"]);
  const [variantPrices, setVariantPrices] = useState(["0"]);
  const [variantDurations, setVariantDurations] = useState(["0"]);

  // Function to check if Add Variant button should be disabled
  const isAddVariantDisabled = () => {
    // Check if any variant with "fixed" price type has price <= 0
    return variantPriceTypes.some((type, index) => 
      type === "fixed" && (Number(variantPrices[index]) <= 0)
    );
  };

  // Create helper function to validate fixed price
  const validateFixedPrice = (priceInput, priceType) => {
    if (priceType === "fixed" && Number(priceInput) <= 0) {
      return false;
    }
    return true;
  };

  // Helper to set validation message on price inputs
  const handlePriceInputValidation = (inputElement, priceType, price) => {
    if (priceType === "fixed" && Number(price) <= 0) {
      inputElement.setCustomValidity("Price must be greater than 0 for Fixed price type");
    } else {
      inputElement.setCustomValidity("");
    }
  };

  const handlePricingAndDurationAmount = (e, index) => {
    const newPriceTypes = [...variantPriceTypes];
    newPriceTypes[index] = e.target.value;
    setVariantPriceTypes(newPriceTypes);
    
    // When changing price type, validate the price input if needed
    if (e.target.value === "fixed") {
      const priceInput = document.getElementById(`pricingAmount-${index}`);
      if (priceInput) {
        handlePriceInputValidation(priceInput, "fixed", variantPrices[index]);
      }
    }
  };

  // Update the price input onChange handler
  const handlePriceChange = (e, index) => {
    const newPrices = [...variantPrices];
    newPrices[index] = e.target.value;
    setVariantPrices(newPrices);
  };

  const addVariant = (e) => {
    e.preventDefault();
    const variantName = document.getElementById("variant-name").value;
    
    // Check if name field is empty
    if (!variantName || variantName.trim() === "") {
      setVariantFormError("Name field can not be empty.");
      return;
    }
    
    // Clear previous error
    setVariantFormError("");
    
    const variantPrice = document.getElementById("variant-price").value;
    const variantPriceType = document.getElementById("variant-price-type").value;
    const variantDuration = document.getElementById("variant-duration").value;
    
    // Create new variant with the form data
    const newVariant = {
      name: variantName,
      price: variantPrice,
      priceType: variantPriceType,
      duration: variantDuration
    };
    
    setPricingAndDurationVariants([...pricingAndDurationVariants, newVariant]);
    setVariantPriceTypes([...variantPriceTypes, variantPriceType]);
    setVariantNames([...variantNames, variantName || "service"]);
    setVariantPrices([...variantPrices, variantPrice]);
    setVariantDurations([...variantDurations, variantDuration]);
    
    setVariantForm(false);
    
    // Reset form fields
    document.getElementById("variant-name").value = "";
    document.getElementById("variant-description").value = "";
    document.getElementById("variant-price").value = "";
    document.getElementById("variant-price-type").value = "free";
    document.getElementById("variant-duration").value = "0";
  };

  const closeVariantForm = (e) => {
    if (e) e.preventDefault();
    setVariantForm(false);
    setVariantFormError("");
    
    // Reset form fields
    document.getElementById("variant-name").value = "";
    document.getElementById("variant-description").value = "";
    document.getElementById("variant-price").value = "";
    document.getElementById("variant-price-type").value = "free";
    document.getElementById("variant-duration").value = "0";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", {
      pricingAndDurationVariants,
      variantPriceTypes,
    });
  };

  const handleTreatmentNameChange = (e) => {
    setTreatmentName(e.target.value);
  };

  const [durationOptions, setDurationOptions] = useState([
    { id: 0, name: "5 minutes" },
    { id: 1, name: "10 minutes" },
    { id: 2, name: "15 minutes" },
    { id: 3, name: "20 minutes" },
    { id: 4, name: "25 minutes" },
    { id: 5, name: "30 minutes" },
    { id: 6, name: "35 minutes" },
    { id: 7, name: "40 minutes" },
    { id: 8, name: "45 minutes" },
    { id: 9, name: "50 minutes" },
    { id: 10, name: "55 minutes" },
    { id: 11, name: "1 hour" },
    { id: 12, name: "1 hour 5 minutes" },
    { id: 13, name: "1 hour 10 minutes" },
    { id: 14, name: "1 hour 15 minutes" },
    { id: 15, name: "1 hour 20 minutes" },
    { id: 16, name: "1 hour 25 minutes" },
    { id: 17, name: "1 hour 30 minutes" },
    { id: 18, name: "1 hour 35 minutes" },
    { id: 19, name: "1 hour 40 minutes" },
    { id: 20, name: "1 hour 45 minutes" },
    { id: 21, name: "1 hour 50 minutes" },
    { id: 22, name: "1 hour 55 minutes" },
    { id: 23, name: "2 hours" },
    { id: 24, name: "2 hours 15 minutes" },
    { id: 25, name: "2 hours 30 minutes" },
    { id: 26, name: "2 hours 45 minutes" },
    { id: 27, name: "3 hours" },
    { id: 28, name: "3 hours 15 minutes" },
    { id: 29, name: "3 hours 30 minutes" },
    { id: 30, name: "3 hours 45 minutes" },
    { id: 31, name: "4 hours" },
    { id: 32, name: "4 hours 15 minutes" },
    { id: 33, name: "4 hours 30 minutes" },
    { id: 34, name: "4 hours 45 minutes" },
    { id: 35, name: "5 hours" },
    { id: 36, name: "5 hours 30 minutes" },
    { id: 37, name: "6 hours" },
    { id: 38, name: "6 hours 30 minutes" },
    { id: 39, name: "7 hours" },
    { id: 40, name: "7 hours 30 minutes" },
    { id: 41, name: "8 hours" },
    { id: 42, name: "9 hours" },
    { id: 43, name: "10 hours" },
    { id: 44, name: "11 hours" },
    { id: 45, name: "12 hours" },
  ]);

  const updateTreatment = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      pricingAndDurationVariants,
      variantPriceTypes,
    });
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Container fluid className="dashboard-page-main">
        <Row>
          <div
            className={`dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start ${
              isSidebarOpen ? "sidebar-open" : "sidebar-close"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />

            <div className="dashboard-content">
              <button
                className="btn btn-primary toggle-sidebar-btn-dashboard"
                onClick={toggleSidebar}
              >
                <FaArrowRight
                  className={`${isSidebarOpen ? "d-none" : "d-block"}`}
                />
                <FaArrowLeft
                  className={`${isSidebarOpen ? "d-block" : "d-none"}`}
                />
              </button>
              <div className="dashboard-content-body">
                <DashboardHeader />
                <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-green25 mb-3 rounded">
                  <Breadcrumb />
                </div>
              </div>

              <div
                className="dashboard-content-table"
                style={{ display: editableForm ? "none" : "block" }}
              >
                <Row>
                  <div className="d-flex justify-content-between align-items-center listing-header">
                    <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">
                      Treatment
                    </h1>
                    <button
                      className="bg-jetGreen all-listing-create-button d-flex align-items-center justify-content-center border-0 text-white py-2 px-3 h6"
                      onClick={() => {
                        document.querySelector(
                          ".dashboard-content-table"
                        ).style.display = "none";
                        document.querySelector(
                          ".sidebar-listing-form"
                        ).style.display = "block";
                      }}
                    >
                      <span className="all-listing-create-button-plus">
                        &#43;
                      </span>{" "}
                      Create
                    </button>
                  </div>
                </Row>
                <hr />

                <Row className="d-flex justify-content-between align-items-center mb-3">
                  <Col>
                    <label htmlFor="entriesPerPage">Show entries:</label>
                    <select
                      id="entriesPerPage"
                      onChange={handleEntriesPerPageChange}
                      className={`setEntriesPerPage ${entriesPerPage}`}
                      defaultValue={entriesPerPage}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </Col>
                  <Col
                    xxl={3}
                    xl={3}
                    lg={3}
                    md={3}
                    sm={12}
                    className="text-end border rounded-2"
                  >
                    <label htmlFor="search-input" className="visually-hidden">
                      Search treatments
                    </label>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      id="search-input"
                      name="search-input"
                    />
                  </Col>
                </Row>

                <div className="table-main-div">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Service Type</th>
                        {/* <th>Category</th> */}
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td colSpan="6" className="text-center text-danger">
                            {error}
                          </td>
                        </tr>
                      ) : filteredEntries.length > 0 ? (
                        currentEntries.map((treatment) => (
                          <tr key={treatment.id}>
                            <td>{treatment.id}</td>
                            <td>{treatment.name}</td>
                            <td>{treatment.service_type || "N/A"}</td>
                            {/* <td>{treatment.category || 'N/A'}</td> */}
                            <td>
                              {treatment.status === 1 ? "Active" : "Inactive"}
                            </td>
                            <td>
                              <button
                                className="btn btn-success me-2"
                                onClick={() => {
                                  setEditableForm(true);
                                  setTreatmentName(treatment.name);
                                  document.querySelector(
                                    ".dashboard-content-table"
                                  ).style.display = "none";
                                  document.querySelector(
                                    ".sidebar-editable-form"
                                  ).style.display = "block";
                                }}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  setTreatmentToDelete(treatment.id);
                                  setDeleteAlert(true);
                                }}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No treatments found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    Showing {indexOfFirstEntry + 1} to{" "}
                    {Math.min(indexOfLastEntry, filteredEntries.length)} of{" "}
                    {filteredEntries.length} entries
                  </div>
                  <div>
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn btn-previous"
                    >
                      Previous
                    </button>
                    <span>
                      {" "}
                      Page {currentPage} of {totalPages}{" "}
                    </span>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="btn btn-next"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <div className="sidebar-listing-form">
                <div className="dashboard-all-listing-create-form">
                  <Row>
                    <div className="d-flex justify-content-flex-start align-items-center listing-header">
                      <button
                        className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2"
                        onClick={() => {
                          document.querySelector(
                            ".sidebar-listing-form"
                          ).style.display = "none";
                          document.querySelector(
                            ".dashboard-content-table"
                          ).style.display = "block";
                        }}
                      >
                        <span className="all-listing-create-form-back-button-arrow">
                          &larr;
                        </span>{" "}
                        Back
                      </button>
                      <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">
                        create treatment
                      </h2>
                    </div>
                  </Row>
                  <hr />

                  <div className="dashboard-all-listing-create-form-body">
                    <form>
                      <Row>
                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatment-name"
                              className="form-label text-capitalize fw-bold small"
                            >
                              name <sup className="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="treatment-name"
                              name="name"
                              required
                              autoComplete="off"
                              value={treatmentName}
                              onChange={handleTreatmentNameChange}
                            />
                          </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatment-status"
                              className="form-label text-capitalize fw-bold small"
                            >
                              status <sup className="text-danger">*</sup>
                            </label>
                            <select
                              name="status"
                              id="treatment-status"
                              className="form-control text-capitalize"
                              required
                            >
                              <option value="">active</option>
                              <option value="1">inactive</option>
                            </select>
                          </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatment-service-type"
                              className="form-label text-capitalize fw-bold small"
                            >
                              service type
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="treatment-service-type"
                              name="serviceType"
                              required
                            />
                          </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                          {/* <div className="form-group my-2">
                            <label
                              htmlFor="treatment-category"
                              className="form-label text-capitalize fw-bold small"
                            >
                              treatment category{" "}
                              <sup className="text-danger">*</sup>
                            </label>
                            <select
                              name="treatmentCategory"
                              id="treatment-category"
                              className="form-control text-capitalize"
                              required
                            >
                              <option value="">active</option>
                              <option value="1">inactive</option>
                            </select>
                          </div> */}
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatmentCategory"
                              className="form-label text-capitalize fw-bold small"
                            >
                              treatment Category
                            </label>
                            <select
                              name="treatmentCategory"
                              id="treatmentCategory"
                              className="form-control text-capitalize"
                              required
                            >
                              <option value="">Select a category</option>
                              {Array.isArray(treatmentCategoriesData) &&
                                treatmentCategoriesData.length > 0 &&
                                treatmentCategoriesData.map(
                                  (categoryName, index) => (
                                    <option value={categoryName.id} key={index}>
                                      {categoryName.name}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatment-description"
                              className="form-label text-capitalize fw-bold small"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id="treatment-description"
                              name="description"
                              required
                            ></textarea>
                          </div>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                          <div className="form-group my-2">
                            <div className="pricing-and-duration">
                              <strong className="d-block">
                                Pricing and duration
                              </strong>
                              <hr />

                              <div className="pricing-and-duration-form">
                                {pricingAndDurationVariants.map(
                                  (variant, index) => (
                                    <div
                                      key={`variant-${index}`}
                                      className="pricing-and-duration-form-row mt-2"
                                    >
                                      <ol className="d-flex align-items-center gap-3 ps-0 mb-0">
                                        <li className="pricing-and-duration-service-name">
                                          <label className="visually-hidden form-label text-capitalize fw-bold small">
                                            service name
                                          </label>
                                          <strong className="d-block text-capitalize">
                                            {variantNames[index] || treatmentName || "service"}
                                          </strong>
                                        </li>
                                        <li className="pricing-and-duration-hours">
                                          <label
                                            htmlFor={`duration-${index}`}
                                            className="form-label text-capitalize fw-bold small"
                                          >
                                            Duration{" "}
                                            <sup className="text-danger">*</sup>
                                          </label>
                                          <select
                                            name={`duration-${index}`}
                                            id={`duration-${index}`}
                                            className="form-control text-capitalize"
                                            required
                                          >
                                            {durationOptions.map((duration) => (
                                              <option
                                                key={duration.id}
                                                value={duration.id}
                                                className="text-capitalize"
                                              >
                                                {duration.name}
                                              </option>
                                            ))}
                                          </select>
                                        </li>
                                        <li className="pricing-and-duration-type">
                                          <label
                                            htmlFor={`priceType-${index}`}
                                            className="form-label text-capitalize fw-bold small"
                                          >
                                            price type{" "}
                                            <sup className="text-danger">*</sup>
                                          </label>
                                          <select
                                            name={`priceType-${index}`}
                                            id={`priceType-${index}`}
                                            className="form-control text-capitalize"
                                            value={variantPriceTypes[index]}
                                            onChange={(e) => {
                                              e.preventDefault();
                                              handlePricingAndDurationAmount(e, index);
                                              // Validate price if switching to fixed type
                                              if (e.target.value === "fixed") {
                                                const priceInput = document.getElementById(`pricingAmount-${index}`);
                                                if (priceInput) {
                                                  handlePriceInputValidation(priceInput, "fixed", variantPrices[index]);
                                                }
                                              }
                                            }}
                                          >
                                            <option
                                              value="free"
                                              className="text-capitalize"
                                            >
                                              free
                                            </option>
                                            <option
                                              value="from"
                                              className="text-capitalize"
                                            >
                                              from
                                            </option>
                                            <option
                                              value="fixed"
                                              className="text-capitalize"
                                            >
                                              fixed
                                            </option>
                                          </select>
                                        </li>
                                        {variantPriceTypes[index] !==
                                          "free" && (
                                          <li className="pricing-and-duration-amount">
                                            <label
                                              htmlFor={`pricingAmount-${index}`}
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              price{" "}
                                              <sup className="text-danger">
                                                *
                                              </sup>
                                            </label>
                                            <input
                                              type="number"
                                              className="form-control"
                                              id={`pricingAmount-${index}`}
                                              name={`pricingAmount-${index}`}
                                              value={variantPrices[index]}
                                              onChange={(e) => {
                                                handlePriceChange(e, index);
                                              }}
                                              required
                                            />
                                          </li>
                                        )}
                                        <li className="remove-pricing-and-duration">
                                          <label className="visually-hidden form-label text-capitalize fw-bold small">
                                            remove
                                          </label>
                                          <button
                                            className="btn btn-danger text-capitalize rounded"
                                            onClick={(e) => {
                                              setPricingAndDurationVariants(
                                                pricingAndDurationVariants.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              setVariantPriceTypes(
                                                variantPriceTypes.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              setVariantNames(
                                                variantNames.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              setVariantPrices(
                                                variantPrices.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              setVariantDurations(
                                                variantDurations.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              e.preventDefault();
                                            }}
                                          >
                                            remove
                                          </button>
                                        </li>
                                      </ol>
                                    </div>
                                  )
                                )}

                                <div className="variantModal-form-button-container">
                                  <button
                                    className="btn mt-3 text-capitalize rounded-0"
                                    onClick={(e) => {
                                      setVariantForm(true);
                                      e.preventDefault();
                                    }}
                                    disabled={isAddVariantDisabled()}
                                  >
                                    {" "}
                                    &#43; Add variant
                                  </button>

                                  <div
                                    className={`variantModal-form ${
                                      variantForm ? "d-block" : "d-none"
                                    }`}
                                  >
                                    <span className="variantModal-form-header d-flex align-items-center justify-content-between">
                                      <strong className="variantModal-form-header-title">
                                        Add variant
                                      </strong>
                                      <button
                                        className="variantModal-form-header-close"
                                        onClick={closeVariantForm}
                                      >
                                        <FaTimes />
                                      </button>
                                    </span>
                                    <hr />
                                    <form onSubmit={addVariant}>
                                      <Row>
                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-name"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              name <sup className="text-danger">*</sup>
                                            </label>
                                            <input
                                              type="text"
                                              className={`form-control ${variantFormError ? 'is-invalid' : ''}`}
                                              id="variant-name"
                                              name="name"
                                              required
                                              autoComplete="off"
                                            />
                                            {variantFormError && (
                                              <div className="invalid-feedback">
                                                <span>{variantFormError}</span>
                                              </div>
                                            )}
                                          </div>
                                        </Col>

                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-description"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              description
                                            </label>
                                            <textarea
                                              className="form-control"
                                              id="variant-description"
                                              name="description"
                                              autoComplete="off"
                                            ></textarea>
                                          </div>
                                        </Col>

                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-price"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              price
                                            </label>
                                            <input
                                              type="number"
                                              className="form-control"
                                              id="variant-price"
                                              name="price"
                                              autoComplete="off"
                                              onChange={(e) => {
                                                const priceType = document.getElementById("variant-price-type")?.value;
                                                handlePriceInputValidation(e.target, priceType, e.target.value);
                                              }}
                                            />
                                          </div>
                                        </Col>

                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-price-type"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              price type
                                            </label>
                                            <select
                                              name="priceType"
                                              id="variant-price-type"
                                              className="form-control text-capitalize"
                                              onChange={(e) => {
                                                // If selecting "fixed", ensure price input gets proper validation
                                                if (e.target.value === "fixed") {
                                                  const priceInput = document.getElementById("variant-price");
                                                  if (priceInput) {
                                                    handlePriceInputValidation(priceInput, "fixed", priceInput.value);
                                                  }
                                                }
                                              }}
                                            >
                                              <option
                                                value="free"
                                                className="text-capitalize"
                                              >
                                                free
                                              </option>
                                              <option
                                                value="from"
                                                className="text-capitalize"
                                              >
                                                from
                                              </option>
                                              <option
                                                value="fixed"
                                                className="text-capitalize"
                                              >
                                                fixed
                                              </option>
                                            </select>
                                          </div>
                                        </Col>

                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-duration"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              duration
                                            </label>
                                            <select
                                              name="duration"
                                              id="variant-duration"
                                              className="form-control text-capitalize"
                                              required
                                            >
                                              {durationOptions.map(
                                                (duration) => (
                                                  <option
                                                    key={duration.id}
                                                    value={duration.id}
                                                    className="text-capitalize"
                                                  >
                                                    {duration.name}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                          </div>
                                        </Col>

                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                          <div className="form-group my-2 d-flex align-items-center justify-content-between">
                                            <button
                                              className="btn btn-danger text-capitalize rounded"
                                              onClick={closeVariantForm}
                                            >
                                              close
                                            </button>

                                            <div className="pricing-and-duration-form-button rounded">
                                              <button
                                                className="btn text-capitalize rounded" 
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  addVariant(e);
                                                }}
                                              >
                                                {" "}
                                                Save variant
                                              </button>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                          <div className="form-group my-2">
                            <input
                              type="submit"
                              className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3"
                              value="Create"
                              onClick={handleSubmit}
                            />
                          </div>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </div>
              </div>

              {/* sidebar editable form */}
              <div
                className="sidebar-editable-form"
                style={{ display: editableForm ? "block" : "none" }}
              >
                <div className="dashboard-all-listing-create-form">
                  <Row>
                    <div className="d-flex justify-content-flex-start align-items-center listing-header">
                      <button
                        className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2"
                        onClick={() => {
                          document.querySelector(
                            ".sidebar-editable-form"
                          ).style.display = "none";
                          document.querySelector(
                            ".dashboard-content-table"
                          ).style.display = "block";
                        }}
                      >
                        <span className="all-listing-create-form-back-button-arrow">
                          &larr;
                        </span>{" "}
                        Back
                      </button>
                      <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">
                        update treatment
                      </h2>
                    </div>
                  </Row>
                  <hr />

                  <div className="dashboard-all-listing-create-form-body">
                    <form onSubmit={updateTreatment}>
                      <Row>
                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatment-name"
                              className="form-label text-capitalize fw-bold small"
                            >
                              name <sup className="text-danger">*</sup>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="treatment-name"
                              name="name"
                              required
                              autoComplete="off"
                              value={treatmentName}
                              onChange={handleTreatmentNameChange}
                            />
                          </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatment-status"
                              className="form-label text-capitalize fw-bold small"
                            >
                              status <sup className="text-danger">*</sup>
                            </label>
                            <select
                              name="status"
                              id="treatment-status"
                              className="form-control text-capitalize"
                              required
                            >
                              <option value="">active</option>
                              <option value="1">inactive</option>
                            </select>
                          </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatment-service-type"
                              className="form-label text-capitalize fw-bold small"
                            >
                              service type
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="treatment-service-type"
                              name="serviceType"
                              required
                            />
                          </div>
                        </Col>

                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatment-category"
                              className="form-label text-capitalize fw-bold small"
                            >
                              treatment category{" "}
                              <sup className="text-danger">*</sup>
                            </label>
                            <select
                              name="treatmentCategory"
                              id="treatment-category"
                              className="form-control text-capitalize"
                              required
                            >
                              <option value="">active</option>
                              <option value="1">inactive</option>
                            </select>
                          </div>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                          <div className="form-group my-2">
                            <label
                              htmlFor="treatment-description"
                              className="form-label text-capitalize fw-bold small"
                            >
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id="treatment-description"
                              name="description"
                              required
                            ></textarea>
                          </div>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                          <div className="form-group my-2">
                            <div className="pricing-and-duration">
                              <strong className="d-block">
                                Pricing and duration
                              </strong>
                              <hr />

                              <div className="pricing-and-duration-form">
                                {pricingAndDurationVariants.map(
                                  (variant, index) => (
                                    <div
                                      key={`variant-${index}`}
                                      className="pricing-and-duration-form-row mt-2"
                                    >
                                      <ol className="d-flex align-items-center gap-3 ps-0 mb-0">
                                        <li className="pricing-and-duration-service-name">
                                          <label className="visually-hidden form-label text-capitalize fw-bold small">
                                            service name
                                          </label>
                                          <strong className="d-block text-capitalize">
                                            {variantNames[index] || treatmentName || "service"}
                                          </strong>
                                        </li>
                                        <li className="pricing-and-duration-hours">
                                          <label
                                            htmlFor={`duration-${index}`}
                                            className="form-label text-capitalize fw-bold small"
                                          >
                                            Duration{" "}
                                            <sup className="text-danger">*</sup>
                                          </label>
                                          <select
                                            name={`duration-${index}`}
                                            id={`duration-${index}`}
                                            className="form-control text-capitalize"
                                            required
                                          >
                                            {durationOptions.map((duration) => (
                                              <option
                                                key={duration.id}
                                                value={duration.id}
                                                className="text-capitalize"
                                              >
                                                {duration.name}
                                              </option>
                                            ))}
                                          </select>
                                        </li>
                                        <li className="pricing-and-duration-type">
                                          <label
                                            htmlFor={`priceType-${index}`}
                                            className="form-label text-capitalize fw-bold small"
                                          >
                                            price type{" "}
                                            <sup className="text-danger">*</sup>
                                          </label>
                                          <select
                                            name={`priceType-${index}`}
                                            id={`priceType-${index}`}
                                            className="form-control text-capitalize"
                                            value={variantPriceTypes[index]}
                                            onChange={(e) => {
                                              e.preventDefault();
                                              handlePricingAndDurationAmount(e, index);
                                              // Validate price if switching to fixed type
                                              if (e.target.value === "fixed") {
                                                const priceInput = document.getElementById(`pricingAmount-${index}`);
                                                if (priceInput) {
                                                  handlePriceInputValidation(priceInput, "fixed", variantPrices[index]);
                                                }
                                              }
                                            }}
                                          >
                                            <option
                                              value="free"
                                              className="text-capitalize"
                                            >
                                              free
                                            </option>
                                            <option
                                              value="from"
                                              className="text-capitalize"
                                            >
                                              from
                                            </option>
                                            <option
                                              value="fixed"
                                              className="text-capitalize"
                                            >
                                              fixed
                                            </option>
                                          </select>
                                        </li>
                                        {variantPriceTypes[index] !==
                                          "free" && (
                                          <li className="pricing-and-duration-amount">
                                            <label
                                              htmlFor={`pricingAmount-${index}`}
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              price{" "}
                                              <sup className="text-danger">
                                                *
                                              </sup>
                                            </label>
                                            <input
                                              type="number"
                                              className="form-control"
                                              id={`pricingAmount-${index}`}
                                              name={`pricingAmount-${index}`}
                                              value={variantPrices[index]}
                                              onChange={(e) => {
                                                handlePriceChange(e, index);
                                              }}
                                              required
                                            />
                                          </li>
                                        )}

                                        <li className="remove-pricing-and-duration">
                                          <label className="visually-hidden form-label text-capitalize fw-bold small">
                                            remove
                                          </label>
                                          <button
                                            className="btn btn-danger text-capitalize rounded"
                                            onClick={(e) => {
                                              setPricingAndDurationVariants(
                                                pricingAndDurationVariants.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              setVariantPriceTypes(
                                                variantPriceTypes.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              setVariantNames(
                                                variantNames.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              setVariantPrices(
                                                variantPrices.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              setVariantDurations(
                                                variantDurations.filter(
                                                  (_, i) => i !== index
                                                )
                                              );
                                              e.preventDefault();
                                            }}
                                          >
                                            remove
                                          </button>
                                        </li>
                                      </ol>
                                    </div>
                                  )
                                )}

                                <div className="variantModal-form-button-container">
                                  <button
                                    className="btn mt-3 text-capitalize rounded-0"
                                    onClick={(e) => {
                                      setVariantForm(true);
                                      e.preventDefault();
                                    }}
                                    disabled={isAddVariantDisabled()}
                                  >
                                    {" "}
                                    &#43; Add variant
                                  </button>

                                  <div
                                    className={`variantModal-form ${
                                      variantForm ? "d-block" : "d-none"
                                    }`}
                                  >
                                    <span className="variantModal-form-header d-flex align-items-center justify-content-between">
                                      <strong className="variantModal-form-header-title">
                                        Add variant
                                      </strong>
                                      <button
                                        className="variantModal-form-header-close"
                                        onClick={closeVariantForm}
                                      >
                                        <FaTimes />
                                      </button>
                                    </span>
                                    <hr />
                                    <form onSubmit={addVariant}>
                                      <Row>
                                        <Col
                                          xxl={12}
                                          xl={12}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                        >
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-name"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              name <sup className="text-danger">*</sup>
                                            </label>
                                            <input
                                              type="text"
                                              className={`form-control ${variantFormError ? 'is-invalid' : ''}`}
                                              id="variant-name"
                                              name="name"
                                              required
                                              autoComplete="off"
                                            />
                                            {variantFormError && (
                                              <div className="invalid-feedback">
                                                {variantFormError}
                                              </div>
                                            )}
                                          </div>
                                        </Col>

                                        <Col
                                          xxl={12}
                                          xl={12}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                        >
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-description"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              description
                                            </label>
                                            <textarea
                                              className="form-control"
                                              id="variant-description"
                                              name="description"
                                              autoComplete="off"
                                            ></textarea>
                                          </div>
                                        </Col>

                                        <Col
                                          xxl={12}
                                          xl={12}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                        >
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-price"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              price
                                            </label>
                                            <input
                                              type="number"
                                              className="form-control"
                                              id="variant-price"
                                              name="price"
                                              autoComplete="off"
                                              onChange={(e) => {
                                                const priceType = document.getElementById("variant-price-type")?.value;
                                                handlePriceInputValidation(e.target, priceType, e.target.value);
                                              }}
                                            />
                                          </div>
                                        </Col>

                                        <Col
                                          xxl={12}
                                          xl={12}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                        >
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-price-type"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              price type
                                            </label>
                                            <select
                                              name="priceType"
                                              id="variant-price-type"
                                              className="form-control text-capitalize"
                                              onChange={(e) => {
                                                // If selecting "fixed", ensure price input gets proper validation
                                                if (e.target.value === "fixed") {
                                                  const priceInput = document.getElementById("variant-price");
                                                  if (priceInput) {
                                                    handlePriceInputValidation(priceInput, "fixed", priceInput.value);
                                                  }
                                                }
                                              }}
                                            >
                                              <option
                                                value="free"
                                                className="text-capitalize"
                                              >
                                                free
                                              </option>
                                              <option
                                                value="from"
                                                className="text-capitalize"
                                              >
                                                from
                                              </option>
                                              <option
                                                value="fixed"
                                                className="text-capitalize"
                                              >
                                                fixed
                                              </option>
                                            </select>
                                          </div>
                                        </Col>

                                        <Col
                                          xxl={12}
                                          xl={12}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                        >
                                          <div className="form-group my-2">
                                            <label
                                              htmlFor="variant-duration"
                                              className="form-label text-capitalize fw-bold small"
                                            >
                                              duration
                                            </label>
                                            <select
                                              name="duration"
                                              id="variant-duration"
                                              className="form-control text-capitalize"
                                              required
                                            >
                                              {durationOptions.map(
                                                (duration) => (
                                                  <option
                                                    key={duration.id}
                                                    value={duration.id}
                                                    className="text-capitalize"
                                                  >
                                                    {duration.name}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                          </div>
                                        </Col>

                                        <Col
                                          xxl={12}
                                          xl={12}
                                          lg={12}
                                          md={12}
                                          sm={12}
                                        >
                                          <div className="form-group my-2 d-flex align-items-center justify-content-between">
                                            <button
                                              className="btn btn-danger text-capitalize rounded"
                                              onClick={closeVariantForm}
                                            >
                                              close
                                            </button>

                                            <div className="pricing-and-duration-form-button rounded">
                                              <button
                                                className="btn text-capitalize rounded" 
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  addVariant(e);
                                                }}
                                              >
                                                {" "}
                                                Save variant
                                              </button>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                          <div className="form-group my-2">
                            <input
                              type="submit"
                              className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3 text-capitalize"
                              value="update"
                              onClick={updateTreatment}
                            />
                          </div>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </div>
              </div>
              {/* sidebar editable form ends here */}
            </div>
          </div>
        </Row>
        {/* Delete Confirmation Modal */}
        {deleteAlert && (
          <div
            className="alert-container position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          >
            <div
              className="alert-box bg-white p-4 rounded"
              style={{ width: "400px", maxWidth: "90%" }}
            >
              <div className="text-center mb-3">
                <h5 className="fw-bold">Are you sure?</h5>
                <p>You won't be able to revert this!</p>
              </div>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-danger px-4"
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");
                      if (!token)
                        throw new Error("No authentication token found");

                      await axios.delete(
                        `${$siteURL}/api/treatment/${treatmentToDelete}`,
                        {
                          headers: {
                            Authorization: `Bearer ${JSON.parse(token)}`,
                          },
                        }
                      );
                      // Refresh the treatments list after successful deletion
                      fetchTreatments();
                    } catch (error) {
                      console.error("Delete failed:", error);
                      setError(
                        error.response?.data?.message ||
                          "Failed to delete treatment"
                      );
                    } finally {
                      setDeleteAlert(false);
                    }
                  }}
                >
                  Yes, delete it
                </button>
                <button
                  className="btn btn-secondary px-4"
                  onClick={() => setDeleteAlert(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default Treatment;
