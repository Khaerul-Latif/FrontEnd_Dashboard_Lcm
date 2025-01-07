import React, { useState } from "react";
import { useProspects } from "../../../context/ProspectContext";
import { PiStudentBold } from "react-icons/pi";
import {
  MdOutlinePendingActions,
  MdPaid,
  MdClose,
  MdCheck,
  MdWifiCalling1,
  MdWifiCalling2,
  MdWifiCalling3,
} from "react-icons/md";
import { RiPassExpiredLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import Select from "react-select";
import Pagination from "../../components/Pagination";

// Constants
const INITIAL_FILTERS = {
  startDate: "",
  endDate: "",
  city_name: "",
  program_name: "",
  source: "",
};


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

// Components
const Card = ({ card }) => (
  <div className="col-12 col-sm-6 col-md-3">
    <div className="card h-100 shadow-sm" role="button">
      <div className="card-body d-flex flex-column align-items-center p-3">
        <div className="mb-2">{card.icon}</div>
        <h6 className="card-title mb-1">{card.title}</h6>
        <p className="fw-bold mb-0">{card.count}</p>
      </div>
    </div>
  </div>
);

const FilterInput = ({ name, value, onChange, options }) => {
  const label = formatLabel(name);

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

const TableRow = ({ item, index, updateFU }) => {
  const handleFUChange = async (selectedOption) => {
    try {
      const updatedData = await updateFU(item.id, {
        call: selectedOption.value,
      });
      if (updatedData) {
        item.call = selectedOption.value;
      }
    } catch (error) {
      console.error("Error updating FU:", error);
      alert("Error CAll");
    }
  };

  return (
    <tr className="text-center">
       <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>{item.phone}</td>
      <td>{item.email}</td>
      <td>{item.program_name}</td>
      <td>{item.city_name}</td>
      <td>{item.invitationCode || "-"}</td>
      <td>
        {item.status == 0 ? "Pending" : ""}
      </td>
      <td>{item.source}</td>
      <td>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={FOLLOW_UP_OPTIONS}
          defaultValue={FOLLOW_UP_OPTIONS.find(
            (opt) => opt.value === item.call
          )}
          onChange={handleFUChange}
          isSearchable={false}
        />
      </td>
    </tr>
  );
};

// Main Component
const AdminSesiPerkenalan = ({ setActiveDetail }) => {
  const {
    prospects,
    loading,
    filterProspects,
    updateProspect,
    prospectCount,
    pendingCount,
    expiredCount,
    paidCount,
  } = useProspects();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const filteredProspects = prospects.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
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

  const CARD_DATA = [
    {
      id: "totalStudent",
      icon: <PiStudentBold style={{ fontSize: "28px", color: "#4CAF50" }} />,
      title: "Total Prospect",
      count: prospectCount ?? "Loading...",
    },
    {
      id: "pending",
      icon: (
        <MdOutlinePendingActions
          style={{ fontSize: "28px", color: "#FFC107" }}
        />
      ),
      title: "Pending",
      count: pendingCount ?? "Loading...",
    },
    {
      id: "expired",
      icon: (
        <RiPassExpiredLine style={{ fontSize: "28px", color: "#F44336" }} />
      ),
      title: "Expired",
      count: expiredCount ?? "Loading...",
    },
    {
      id: "paid",
      icon: <MdPaid style={{ fontSize: "28px", color: "#2196F3" }} />,
      title: "Paid",
      count: paidCount ?? "Loading...",
    },
  ];

  const applyFilters = () => {
    filterProspects(filters);
    setCurrentPage(1);
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-3">
        {CARD_DATA.map((card) => (
          <Card key={card.id} card={card} onClick={setActiveDetail} />
        ))}
      </div>

      <div className="card mt-4">
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
                  ...new Set(prospects.map((p) => p[key]).filter(Boolean)),
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
          <h5 className="mb-0">List Prospect</h5>
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
                    "Kota",
                    "Invitation Code",
                    "Status",
                    "Source",
                    "FU",
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
                    <td colSpan="10" className="text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <span>Loading data...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedProspects.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    paginatedProspects.map((item, index) => (
                      <TableRow
                        key={item.id}
                        item={item}
                        index={startIndex + index} // Indeks berdasarkan halaman
                        updateFU={updateProspect}
                      />
                    ))
                  )}
                </tbody>
            </table>
          </div>  
          {paginatedProspects.length === 0 ? null :   <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            filteredProspects={filteredProspects}
            onPageChange={handlePageChange}
          />}
        </div>
      </div>
    </div>
  );
};

export default AdminSesiPerkenalan;