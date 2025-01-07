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
  MdOutlinePayment,
  MdPaid,
} from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { FcCallback } from "react-icons/fc";
import { useProgram } from "../../../context/ProgramContext";
import SignUpModal from "../../components/SignUpModal";
import Pagination from "../../components/Pagination";
import { LuMapPinCheckInside } from 'react-icons/lu';

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

const TableRow = ({ index, item, onSignUp, updateFU }) => {
   const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    const { programs, isLoading: programLoading, fetchPrograms,  } = useProgram();
    useEffect(() => {
        fetchPrograms(item.id_program);
    }, [item.id_program]);
  const handleFUChange = async (selectedOption) => {
    
    try {
      const updatedData = await updateFU(item.id, {
        call3: selectedOption.value,
      });
      if (updatedData) {
        item.call3 = selectedOption.value;
      }
    } catch (error) {
      console.error("Error updating FU:", error);
      alert("Error CAll");
    }
  };
  const handleSignUpClick = (prospect) => {
    setSelectedItem(prospect);
    setShowModal(true);
  };

  return (
    <>
     {showModal && (
        <SignUpModal
          show={showModal}
          onHide={() => setShowModal(false)}
          prospect={selectedItem}
          onConfirm={(data) => {
            onSignUp(data);
            setShowModal(false);
          }}
          programs={programs}
        />
      )}
    <tr className="text-center text-dark">
      <td>{index + 1}</td>
      {/* <td>{item.id}</td> */}
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
          ? moment(item.tgl_checkin).format("DD-MM-YYYY")
          : "SU NO SP"}
      </td>
      <td>{item.source}</td>
      <td>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          options={FOLLOW_UP_OPTIONS}
          defaultValue={FOLLOW_UP_OPTIONS.find(
            (opt) => opt.value === item.call3
          )}
          onChange={handleFUChange}
          isSearchable={false}
        />
      </td>
      <td>
      <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSignUpClick(item)}
            disabled={item.user_email !== null}
          >
            Sign Up
          </button>
      </td>
    </tr>
    </>
  );
};

const AdminDaftarHadirSP = ({ setActiveDetail }) => {
  const { countCheckin, paidSP, countCheckinToday, prgprospects, loading, filterProspects, paymentManual, updateProspect } =
    useProspects();
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const filteredProspects = prgprospects.filter((item) => {
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

  const CARD_DATA = [
    {
      id: "totalPaid",
      icon: <MdOutlinePayment  style={{ fontSize: "28px", color: "#4CAF50" }} />,
      title: "Total Paid",
      count: paidSP ?? "Loading...",
    },
    {
      id: "paidToday",
      icon: <MdPaid style={{ fontSize: "28px", color: "#2196F3" }} />,
      title: "Paid Today",
      count: countCheckinToday ?? "Loading...",
    },
    {
      id: "checkin",
      icon: (
        <LuMapPinCheckInside
          style={{ fontSize: "28px", color: "#FFC107" }}
        />
      ),
      title: "Check-in",
      count: countCheckin ?? "Loading...",
    },
  ];

  const applyFilters = async () => {
    await filterProspects(filters);
  };

  const handleSignUp = (prospect) => {
    const data = {
      parent_id: prospect?.parent_id,
      program_id: prospect?.program_id,
      num_children: prospect?.num_children,
      total: prospect?.total,
      payment_status: prospect?.payment_status,
      payment_method: prospect?.payment_method,
    }

    console.log("Data Dari Handle Signup Daftar Hadir SP :", data);

    paymentManual(data);
  };
    return (
    <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row g-1">
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
                  ...new Set(prgprospects.map((p) => p[key]).filter(Boolean)),
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
          <h5 className="mb-0">List Peserta Daftar Hadir SP</h5>
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
                    "Branch",
                    "Status",
                    "Tanggal SP",
                    "Source",
                    "FU",
                    "Action"
                  ].map((header) => (
                    <th key={header} className="text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-primary">
                {loading ? (
                <tr>
                  <td colSpan="11" className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                      <span>Loading data...</span>
                    </div>
                  </td>
                </tr>
              ) : (paginatedProspects.length === 0) ? (
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
                      index={startIndex + index} // Indeks berdasarkan halaman
                      onSignUp={handleSignUp}
                      updateFU={updateProspect}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
          {paginatedProspects.length === 0 ? null : <Pagination
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

export default AdminDaftarHadirSP;