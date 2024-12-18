// import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePendingActions } from "react-icons/md";


const AdminParent = () => {
  const [activeTab, setActiveTab] = useState("SP");
  const [activeDetail, setActiveDetail] = useState("totalStudent"); // Set default detail to "totalStudent"
  const handleEdit = (id) => {
    console.log(`Editing item with id: ${id}`);
    // Implement your edit logic here
  };
  const index = 1;
  
  const handleDelete = (id) => {
    console.log(`Deleting item with id: ${id}`);
    // Implement your delete logic here
  };
 

  // const tableData = {
  //   totalStudent: [
  //     {
  //       id: 1,
  //       name: "Alice",
  //       phone: "081234567890",
  //       referenceId: "REF12345",
  //       voucherCode: "VOUCHER10",
  //       registrationDate: "2024-12-01",
  //       status: "Active",
  //       action: "Edit",
  //     },
  //     {
  //       id: 2,
  //       name: "Bob",
  //       phone: "081987654321",
  //       referenceId: "REF67890",
  //       voucherCode: "VOUCHER20",
  //       registrationDate: "2024-12-02",
  //       status: "Active",
  //       action: "Edit",
  //     },
  //   ],
  //   pending: [
  //     {
  //       id: 1,
  //       name: "Charlie",
  //       phone: "081223344556",
  //       referenceId: "REF11111",
  //       voucherCode: "VOUCHER30",
  //       registrationDate: "2024-12-03",
  //       status: "Pending",
  //       action: "Edit",
  //     },
  //     {
  //       id: 2,
  //       name: "David",
  //       phone: "081334455667",
  //       referenceId: "REF22222",
  //       voucherCode: "VOUCHER40",
  //       registrationDate: "2024-12-04",
  //       status: "Pending",
  //       action: "Edit",
  //     },
  //   ],
  //   expired: [
  //     {
  //       id: 1,
  //       name: "Eve",
  //       phone: "081445566778",
  //       referenceId: "REF33333",
  //       voucherCode: "VOUCHER50",
  //       registrationDate: "2024-12-05",
  //       status: "Expired",
  //       action: "Edit",
  //     },
  //     {
  //       id: 2,
  //       name: "Frank",
  //       phone: "081556677889",
  //       referenceId: "REF44444",
  //       voucherCode: "VOUCHER60",
  //       registrationDate: "2024-12-06",
  //       status: "Expired",
  //       action: "Edit",
  //     },
  //   ],
  //   paid: [
  //     {
  //       id: 1,
  //       name: "Grace",
  //       phone: "081667788990",
  //       referenceId: "REF55555",
  //       voucherCode: "VOUCHER70",
  //       registrationDate: "2024-12-07",
  //       status: "Paid",
  //       action: "Edit",
  //     },
  //     {
  //       id: 2,
  //       name: "Hank",
  //       phone: "081778899001",
  //       referenceId: "REF66666",
  //       voucherCode: "VOUCHER80",
  //       registrationDate: "2024-12-08",
  //       status: "Paid",
  //       action: "Edit",
  //     },
  //   ],
  // };
  // const tableData = {
  //   totalStudent: [
  //     {
  //       id: 1,
  //       name: "Alice",
  //       phone: "081234567890",
  //       referenceId: "REF12345",
  //       voucherCode: "VOUCHER10",
  //       registrationDate: "2024-12-01",
  //       status: "Active",
  //       action: "Edit",
  //     },
  //     {
  //       id: 2,
  //       name: "Bob",
  //       phone: "081987654321",
  //       referenceId: "REF67890",
  //       voucherCode: "VOUCHER20",
  //       registrationDate: "2024-12-02",
  //       status: "Active",
  //       action: "Edit",
  //     },
  //   ],
  //   pending: [
  //     {
  //       id: 1,
  //       name: "Charlie",
  //       phone: "081223344556",
  //       referenceId: "REF11111",
  //       voucherCode: "VOUCHER30",
  //       registrationDate: "2024-12-03",
  //       status: "Pending",
  //       action: "Edit",
  //     },
  //     {
  //       id: 2,
  //       name: "David",
  //       phone: "081334455667",
  //       referenceId: "REF22222",
  //       voucherCode: "VOUCHER40",
  //       registrationDate: "2024-12-04",
  //       status: "Pending",
  //       action: "Edit",
  //     },
  //   ],
  //   expired: [
  //     {
  //       id: 1,
  //       name: "Eve",
  //       phone: "081445566778",
  //       referenceId: "REF33333",
  //       voucherCode: "VOUCHER50",
  //       registrationDate: "2024-12-05",
  //       status: "Expired",
  //       action: "Edit",
  //     },
  //     {
  //       id: 2,
  //       name: "Frank",
  //       phone: "081556677889",
  //       referenceId: "REF44444",
  //       voucherCode: "VOUCHER60",
  //       registrationDate: "2024-12-06",
  //       status: "Expired",
  //       action: "Edit",
  //     },
  //   ],
  //   paid: [
  //     {
  //       id: 1,
  //       name: "Grace",
  //       phone: "081667788990",
  //       referenceId: "REF55555",
  //       voucherCode: "VOUCHER70",
  //       registrationDate: "2024-12-07",
  //       status: "Paid",
  //       action: "Edit",
  //     },
  //     {
  //       id: 2,
  //       name: "Hank",
  //       phone: "081778899001",
  //       referenceId: "REF66666",
  //       voucherCode: "VOUCHER80",
  //       registrationDate: "2024-12-08",
  //       status: "Paid",
  //       action: "Edit",
  //     },
  //   ],
  // };
  const [tableData, setTableData] = useState([]);

  // Fetch data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/parents"); // Ganti URL sesuai endpoint
        const result = await response.json();
        setTableData(result.data); // Simpan data ke state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveDetail(null); // Reset detail view when switching tabs
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      {/* Navigation Buttons */}
      <div className="d-flex justify-content-left gap-3 mb-3">
        <button
          className={`btn ${
            activeTab === "SP" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("SP")}
        >
          SP Dashboard
        </button>
        <button
          className={`btn ${
            activeTab === "Program" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("Program")}
        >
          Program Dashboard
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "SP" && (
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* SP */}
          <div className="row">
            <div className="col-12">
              <h5 className="section-title">Student SP</h5>
              <hr className="section-divider" />
            </div>
            <div className="col-lg-4 col-md-4 order-1">
              <div className="row">
                {/* Profit */}
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div
                    className="card"
                    onClick={() => setActiveDetail("totalStudent")}
                  >
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <PiStudentBold style={{ fontSize: "35px" }} />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt3"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">
                        Total Prospect
                      </span>
                      <h3 className="card-title mb-2">12,628</h3>
                    </div>
                  </div>
                </div>
                {/* Sales */}
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div
                    className="card"
                    onClick={() => setActiveDetail("pending")}
                  >
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <MdOutlinePendingActions
                            style={{ fontSize: "35px" }}
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt3"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Pending</span>
                      <h3 className="card-title mb-2">12,628</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 order-3 order-md-2">
              <div className="row">
                {/* Payments */}
                <div className="col-lg-3 col-md-6 col-6 mb-4">
                  <div
                    className="card"
                    onClick={() => setActiveDetail("expired")}
                  >
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/paypal.png"
                            alt="Credit Card"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt4"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt4"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="d-block mb-1">Expired</span>
                      <h3 className="card-title text-nowrap mb-2">2,456</h3>
                    </div>
                  </div>
                </div>
                {/* Transactions */}
                <div className="col-lg-3 col-md-6 col-6 mb-4">
                  <div className="card" onClick={() => setActiveDetail("paid")}>
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/cc-primary.png"
                            alt="Credit Card"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt1"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="cardOpt1"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Paid</span>
                      <h3 className="card-title mb-2">14,857</h3>
                    </div>
                  </div>
                </div>
                {/* Profile Report */}
                <div className="col-lg-6 col-md-12 col-12 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                        <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                          <div className="card-title">
                            <h5 className="text-nowrap mb-2">Payment Report</h5>
                            <span className="badge bg-label-warning rounded-pill">
                              Year
                            </span>
                          </div>
                          <div className="mt-sm-auto">
                            <small className="text-success text-nowrap fw-semibold">
                              <i className="bx bx-chevron-up" /> 68.2%
                            </small>
                            <h3 className="mb-0">$84,686k</h3>
                          </div>
                        </div>
                        <div id="profileReportChart" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Program" && (
        <div className="container-xxl flex-grow-1 container-p-y">
          {/* SP */}
          <div className="row">
            <div className="col-12">
              <h5 className="section-title">Student SP</h5>
              <hr className="section-divider" />
            </div>
            <div className="col-lg-4 col-md-4 order-1">
              <div className="row">
                {/* Profit */}
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/chart-success.png"
                            alt="chart success"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt3"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">
                        Total Student
                      </span>
                      <h3 className="card-title mb-2">12,628</h3>
                      {/* <small className="text-success fw-semibold">
                 <i className="bx bx-up-arrow-alt" /> +72.80%
               </small> */}
                    </div>
                  </div>
                </div>
                {/* Sales */}
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/chart-success.png"
                            alt="chart success"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt3"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Pending</span>
                      <h3 className="card-title mb-2">12,628</h3>
                      {/* <small className="text-success fw-semibold">
                 <i className="bx bx-up-arrow-alt" /> +72.80%
               </small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 order-3 order-md-2">
              <div className="row">
                {/* Payments */}
                <div className="col-lg-3 col-md-6 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/paypal.png"
                            alt="Credit Card"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt4"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt4"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="d-block mb-1">Expired</span>
                      <h3 className="card-title text-nowrap mb-2">2,456</h3>
                      {/* <small className="text-danger fw-semibold">
                 <i className="bx bx-down-arrow-alt" /> -14.82%
               </small> */}
                    </div>
                  </div>
                </div>
                {/* Transactions */}
                <div className="col-lg-3 col-md-6 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/cc-primary.png"
                            alt="Credit Card"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt1"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="cardOpt1"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Paid</span>
                      <h3 className="card-title mb-2">14,857</h3>
                      {/* <small className="text-success fw-semibold">
                 <i className="bx bx-up-arrow-alt" /> +28.14%
               </small> */}
                    </div>
                  </div>
                </div>
                {/* Profile Report */}
                <div className="col-lg-6 col-md-12 col-12 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                        <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                          <div className="card-title">
                            <h5 className="text-nowrap mb-2">Payment Report</h5>
                            <span className="badge bg-label-warning rounded-pill">
                              Year
                            </span>
                          </div>
                          <div className="mt-sm-auto">
                            <small className="text-success text-nowrap fw-semibold">
                              <i className="bx bx-chevron-up" /> 68.2%
                            </small>
                            <h3 className="mb-0">$84,686k</h3>
                          </div>
                        </div>
                        <div id="profileReportChart" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program */}
          <div className="row">
            <div className="col-12">
              <h5 className="section-title">Program</h5>
              <hr className="section-divider" />
            </div>
            <div className="col-lg-4 col-md-4 order-1">
              <div className="row">
                {/* Profit */}
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/chart-success.png"
                            alt="chart success"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt3"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">
                        Total Student
                      </span>
                      <h3 className="card-title mb-2">12,628</h3>
                      {/* <small className="text-success fw-semibold">
                 <i className="bx bx-up-arrow-alt" /> +72.80%
               </small> */}
                    </div>
                  </div>
                </div>
                {/* Sales */}
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/chart-success.png"
                            alt="chart success"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt3"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt3"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">
                        Total Student
                      </span>
                      <h3 className="card-title mb-2">12,628</h3>
                      {/* <small className="text-success fw-semibold">
                 <i className="bx bx-up-arrow-alt" /> +72.80%
               </small> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 order-3 order-md-2">
              <div className="row">
                {/* Payments */}
                <div className="col-lg-3 col-md-6 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/paypal.png"
                            alt="Credit Card"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt4"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="cardOpt4"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="d-block mb-1">Expired</span>
                      <h3 className="card-title text-nowrap mb-2">2,456</h3>
                      {/* <small className="text-danger fw-semibold">
                 <i className="bx bx-down-arrow-alt" /> -14.82%
               </small> */}
                    </div>
                  </div>
                </div>
                {/* Transactions */}
                <div className="col-lg-3 col-md-6 col-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img
                            src="../assets/img/icons/unicons/cc-primary.png"
                            alt="Credit Card"
                            className="rounded"
                          />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt1"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="cardOpt1"
                          >
                            <a className="dropdown-item" href="#">
                              View More
                            </a>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">Paid</span>
                      <h3 className="card-title mb-2">14,857</h3>
                      {/* <small className="text-success fw-semibold">
                 <i className="bx bx-up-arrow-alt" /> +28.14%
               </small> */}
                    </div>
                  </div>
                </div>
                {/* Profile Report */}
                <div className="col-lg-6 col-md-12 col-12 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                        <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                          <div className="card-title">
                            <h5 className="text-nowrap mb-2">Payment Report</h5>
                            <span className="badge bg-label-warning rounded-pill">
                              Year
                            </span>
                          </div>
                          <div className="mt-sm-auto">
                            <small className="text-success text-nowrap fw-semibold">
                              <i className="bx bx-chevron-up" /> 68.2%
                            </small>
                            <h3 className="mb-0">$84,686k</h3>
                          </div>
                        </div>
                        <div id="profileReportChart" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Order Statistics */}
            <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex align-items-center justify-content-between pb-0">
                  <div className="card-title mb-0">
                    <h5 className="m-0 me-2">Order Statistics</h5>
                    <small className="text-muted">42.82k Total Sales</small>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="orederStatistics"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bx bx-dots-vertical-rounded" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="orederStatistics"
                    >
                      <a className="dropdown-item" href="#">
                        Select All
                      </a>
                      <a className="dropdown-item" href="#">
                        Refresh
                      </a>
                      <a className="dropdown-item" href="#">
                        Share
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex flex-column align-items-center gap-1">
                      <h2 className="mb-2">8,258</h2>
                      <span>Total Orders</span>
                    </div>
                    <div id="orderStatisticsChart" />
                  </div>
                  <ul className="p-0 m-0">
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-primary">
                          <i className="bx bx-mobile-alt" />
                        </span>
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Electronic</h6>
                          <small className="text-muted">
                            Mobile, Earbuds, TV
                          </small>
                        </div>
                        <div className="user-progress">
                          <small className="fw-semibold">82.5k</small>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-success">
                          <i className="bx bx-closet" />
                        </span>
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Fashion</h6>
                          <small className="text-muted">
                            T-shirt, Jeans, Shoes
                          </small>
                        </div>
                        <div className="user-progress">
                          <small className="fw-semibold">23.8k</small>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-info">
                          <i className="bx bx-home-alt" />
                        </span>
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Decor</h6>
                          <small className="text-muted">Fine Art, Dining</small>
                        </div>
                        <div className="user-progress">
                          <small className="fw-semibold">849k</small>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex">
                      <div className="avatar flex-shrink-0 me-3">
                        <span className="avatar-initial rounded bg-label-secondary">
                          <i className="bx bx-football" />
                        </span>
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <h6 className="mb-0">Sports</h6>
                          <small className="text-muted">
                            Football, Cricket Kit
                          </small>
                        </div>
                        <div className="user-progress">
                          <small className="fw-semibold">99</small>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*/ Order Statistics */}
            {/* Expense Overview */}
            <div className="col-md-6 col-lg-4 order-1 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item">
                      <button
                        type="button"
                        className="nav-link active"
                        role="tab"
                        data-bs-toggle="tab"
                        data-bs-target="#navs-tabs-line-card-income"
                        aria-controls="navs-tabs-line-card-income"
                        aria-selected="true"
                      >
                        Income
                      </button>
                    </li>
                    <li className="nav-item">
                      <button type="button" className="nav-link" role="tab">
                        Expenses
                      </button>
                    </li>
                    <li className="nav-item">
                      <button type="button" className="nav-link" role="tab">
                        Profit
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body px-0">
                  <div className="tab-content p-0">
                    <div
                      className="tab-pane fade show active"
                      id="navs-tabs-line-card-income"
                      role="tabpanel"
                    >
                      <div className="d-flex p-4 pt-3">
                        <div className="avatar flex-shrink-0 me-3">
                          <img
                            src="../assets/img/icons/unicons/wallet.png"
                            alt="User"
                          />
                        </div>
                        <div>
                          <small className="text-muted d-block">
                            Total Balance
                          </small>
                          <div className="d-flex align-items-center">
                            <h6 className="mb-0 me-1">$459.10</h6>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-chevron-up" />
                              42.9%
                            </small>
                          </div>
                        </div>
                      </div>
                      <div id="incomeChart" />
                      <div className="d-flex justify-content-center pt-4 gap-2">
                        <div className="flex-shrink-0">
                          <div id="expensesOfWeek" />
                        </div>
                        <div>
                          <p className="mb-n1 mt-1">Expenses This Week</p>
                          <small className="text-muted">
                            $39 less than last week
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*/ Expense Overview */}
            {/* Transactions */}
            <div className="col-md-6 col-lg-4 order-2 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="card-title m-0 me-2">Transactions</h5>
                  <div className="dropdown">
                    <button
                      className="btn p-0"
                      type="button"
                      id="transactionID"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bx bx-dots-vertical-rounded" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="transactionID"
                    >
                      <a className="dropdown-item" href="#">
                        Last 28 Days
                      </a>
                      <a className="dropdown-item" href="#">
                        Last Month
                      </a>
                      <a className="dropdown-item" href="#">
                        Last Year
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="p-0 m-0">
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img
                          src="../assets/img/icons/unicons/paypal.png"
                          alt="User"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">
                            Paypal
                          </small>
                          <h6 className="mb-0">Send money</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">+82.6</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img
                          src="../assets/img/icons/unicons/wallet.png"
                          alt="User"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">
                            Wallet
                          </small>
                          <h6 className="mb-0">Mac'D</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">+270.69</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img
                          src="../assets/img/icons/unicons/chart.png"
                          alt="User"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">
                            Transfer
                          </small>
                          <h6 className="mb-0">Refund</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">+637.91</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img
                          src="../assets/img/icons/unicons/cc-success.png"
                          alt="User"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">
                            Credit Card
                          </small>
                          <h6 className="mb-0">Ordered Food</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">-838.71</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex mb-4 pb-1">
                      <div className="avatar flex-shrink-0 me-3">
                        <img
                          src="../assets/img/icons/unicons/wallet.png"
                          alt="User"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">
                            Wallet
                          </small>
                          <h6 className="mb-0">Starbucks</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">+203.33</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                    <li className="d-flex">
                      <div className="avatar flex-shrink-0 me-3">
                        <img
                          src="../assets/img/icons/unicons/cc-warning.png"
                          alt="User"
                          className="rounded"
                        />
                      </div>
                      <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                        <div className="me-2">
                          <small className="text-muted d-block mb-1">
                            Mastercard
                          </small>
                          <h6 className="mb-0">Ordered Food</h6>
                        </div>
                        <div className="user-progress d-flex align-items-center gap-1">
                          <h6 className="mb-0">-92.45</h6>
                          <span className="text-muted">USD</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/*/ Transactions */}
          </div>
        </div>
      )}

      {/* Tampilkan tabel berdasarkan activeDetail */}
      {/* {activeDetail && tableData[activeDetail] && ( */}
      {activeDetail && (
        <div className="card mt-4">
          <div className="card-header">
            <h5>
              {/* Detail {activeDetail === "totalStudent" && "Total Student"}
              {activeDetail === "pending" && "Pending"}
              {activeDetail === "expired" && "Expired"}
              {activeDetail === "paid" && "Paid"} */}
              Detail Student
            </h5>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
              <tr>
                <td>No</td>
              <td>Nama</td>
              <td>No HP</td>
              <td>ID Reference</td>
              <td>Voucher Code</td>
              <td>Tanggal Daftar</td>
              <td>Status</td>
              <td>Action</td>
          
                </tr>
              </thead>
              <tbody>
              
              </tbody>
              {/* {tableData.map((item) => (
      <tr key={item.id}>
        <td>{tableData}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.referenceId ?? ""}</td>
        <td>{item.voucherCode ?? ""}</td>
        <td>{item.registrationDate ?? ""}</td>
        <td>{item.status ?? ""}</td>
        <td>
          <button onClick={() => handleEdit(item.id)}>Edit</button>
        </td>
      </tr> */}
            </table>
          </div>
        </div>
        
      )}
      

    </div>
  );
};

export default AdminParent;
