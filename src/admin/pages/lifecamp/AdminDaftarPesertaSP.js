import React, { useState, useEffect } from "react";
import { useProspects } from "../../../context/ProspectContext";
import moment from "moment";
import Select from "react-select";
import {
  MdClose,
  MdCheck,
  MdWifiCalling1,
  MdWifiCalling2,
  MdWifiCalling3,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import axiosInstance from "../../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";


const INITIAL_FILTERS = {
  startDate: "",
  endDate: "",
  city_name: "",
  program_name: "",
  status: "",
  source: "",
};

const STATUS_OPTIONS = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Paid" },
  { value: "2", label: "Expired" },
];



const FOLLOW_UP_OPTIONS = [
  { value: 0, label: "Select" },
  { value: 1, label: <FaWhatsapp style={{ color: "green" }} /> },
  { value: 2, label: <FcCallback /> },
  { value: 3, label: <MdClose style={{ color: "red" }} /> },
  { value: 4, label: <MdCheck style={{ color: "green" }} /> },
  { value: 5, label: <MdWifiCalling1 style={{ color: "red" }} /> },
  { value: 6, label: <MdWifiCalling2 style={{ color: "red" }} /> },
  { value: 7, label: <MdWifiCalling3 style={{ color: "red" }} /> },
];

const formatLabel = (name) => {
  switch (name) {
    case "startDate":
      return "Start Date";
    case "endDate":
      return "End Date";
    case "city_name":
      return "City";
    case "program_name":
      return "Program";
    default:
      return name
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/_/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());
  }
};

const FilterInput = ({ name, value, onChange, options }) => {
  const label = formatLabel(name);

  if (name === "status") {
    return (
      <div className="col-md-2">
        <label className="form-label">{label}</label>
        <select
          className="form-select"
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">All</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (name.toLowerCase().includes("date")) {
    return (
      <div className="col-md-2">
        <label className="form-label">{label}</label>
        <input
          type="date"
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div className="col-md-2">
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};



const TableRow = ({ index, item, handleCheckin, updateFU }) => {
  const handleCheckinClick = async () => {
    try {
      await handleCheckin(item.id);
    } catch (error) {
      console.error("Check-in failed:", error);
    }
  };
  const handleFUChange = async (selectedOption) => {
    try {
      const updatedData = await updateFU(item.id, {
        call2: selectedOption.value,
      });
      if (updatedData) {
        item.call2 = selectedOption.value;
      }
    } catch (error) {
      console.error("Error updating FU:", error);
      alert("Error CAll");
    }
  };

  return !item.tgl_checkin ? (
    <tr className="text-center">
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{item.program_name}</td>
      <td>{item.city_name}</td>
      <td>
        {STATUS_OPTIONS.find((opt) => opt.value === String(item.status))
          ?.label || "N/A"}
      </td>
      <td>
        {item.tgl_checkin
          ? moment(item.tgl_checkin).format("DD-MM-YYYY HH:mm:ss")
          : "-"}
      </td>
      <td>{item.source}</td>
      <td>
        <button
          className="btn btn-primary btn-sm w-100"
          onClick={handleCheckinClick}
          disabled={item.tgl_checkin}
        >
          Check-in
        </button>
      </td>
      <td>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={FOLLOW_UP_OPTIONS}
          defaultValue={FOLLOW_UP_OPTIONS.find(
            (opt) => opt.value === item.call2
          )}
          onChange={handleFUChange}
          isSearchable={false}
        />
      </td>
    </tr>
  ) : null;
  

};

const AdminDaftarPesertaSP = ({ setActiveDetail }) => {
  const { spprospects, loading, filterProspects,handleCheckin } =
    useProspects();
    // const {
    //   data: spprospects = [],
    //   isLoading: loadingSPProspects,
    //   error: errorSPProspects,
    // } = useQuery({
    //   queryKey: ["spProspects"],
    //   queryFn: async () => {
    //     const response = await axiosInstance.get("spcall");
    //     return response.data;
    //   },
    // });
  //   const json = ;
  // console.log("Data dari sprospects:", json);
    // const { data, isError, isLoading } = useQuery({
    //   queryKey: ["SpProspect"],
    //    queryFn: spprospects
    // });
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  console.log("Data dari useQuery", spprospects);

  const filteredProspects = spprospects.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "status") return item.status === Number(value);
      if (key === "startDate" || key === "endDate") {
        const itemDate = new Date(item.created_at);
        const startDate = filters.startDate
          ? new Date(filters.startDate)
          : null;
        const endDate = filters.endDate ? new Date(filters.endDate) : null;
        return (
          (!startDate || itemDate >= startDate) &&
          (!endDate || itemDate <= endDate)
        );
      }
      return item[key]?.toString() === value;
    });
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedProspects = filteredProspects.slice(startIndex, startIndex + itemsPerPage);

const totalPages = Math.ceil(filteredProspects.length / itemsPerPage);

const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages) {
    setCurrentPage(newPage);
  }
};


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    await filterProspects(filters);
  };



  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card mt-1">
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(INITIAL_FILTERS).map((key) => (
              <FilterInput
                key={key}
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                options={[
                  ...new Set(spprospects?.map((p) => p[key]).filter(Boolean)),
                ]}
              />
            ))}
            

          </div>
          <button className="btn btn-primary mt-3" onClick={applyFilters}>
            Filter
          </button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header text-white">
          <h5 className="mb-0">List Peserta SP</h5>
        </div>
        <div className="card-body px-0">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  {[
                    "No",
                    "Name",
                    "HP",
                    "Email",
                    "Program",
                    "City",
                    "Status",
                    "Tanggal SP",
                    "Source",
                    "Check-in",
                    "FU"
                  ].map((header) => (
                    <th key={header} className="text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11" className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                      <span>Loading data...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedProspects.length  === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                paginatedProspects.map((item, index) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    index={(currentPage - 1) * itemsPerPage + index} // Indeks berdasarkan halaman
                    handleCheckin={handleCheckin}
                    updateFU={() => {}}
                  />
                ))
              )}
              </tbody>
            </table>
          </div>
          <nav className="d-flex justify-content-end mt-3 mx-3" aria-label="Page navigation">
  <ul className="pagination pagination-rounded pagination-outline-primary">
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => handlePageChange(1)}>
        <i className="bx bx-chevrons-left"></i>
      </button>
    </li>
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
        <i className="bx bx-chevron-left"></i>
      </button>
    </li>
    {[...Array(totalPages)].map((_, index) => (
      <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </button>
      </li>
    ))}
    <li className={`page-item ${currentPage === totalPages || filteredProspects.length == 0 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
        <i className="bx bx-chevron-right"></i>
      </button>
    </li>
    <li className={`page-item ${currentPage === totalPages || filteredProspects.length == 0 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => handlePageChange(totalPages)}>
        <i className="bx bx-chevrons-right"></i>
      </button>
    </li>
  </ul>
</nav>
        </div>
      </div>
    </div>
  );
};

export default AdminDaftarPesertaSP;