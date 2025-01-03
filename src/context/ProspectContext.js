import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const ProspectContext = createContext();

export const useProspects = () => {
  return useContext(ProspectContext);
};

export const ProspectProvider = ({ children }) => {
  const [filteredSPProspects, setFilteredSPProspects] = useState([]);
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    branch_name: "",
    city_name: "",
    status: "",
    source: "",
  });

  const MySwal = withReactContent(Swal);

// Fetch Prospects
const {
  data: prospects = [],
  isLoading: loadingProspects,
  error: errorProspects,
} = useQuery({
  queryKey: ["prospects"],
  queryFn: async () => {
    const response = await axiosInstance.get("prospect");
    return response.data;
  },
});

// Fetch SP Prospects
const {
  data: spprospects = [],
  isLoading: loadingSPProspects,
  error: errorSPProspects,
} = useQuery({
  queryKey: ["spProspects"],
  queryFn: async () => {
    const response = await axiosInstance.get("spcall");
    return response.data;
  },
});

// Fetch PRG Prospects
const {
  data: prgprospects = [],
  isLoading: loadingPrgProspects,
  error: errorPrgProspects,
} = useQuery({
  queryKey: ["prgProspects"],
  queryFn: async () => {
    const response = await axiosInstance.get("prgcall");
    return response.data;
  },
});

const {
  data: intrprgprospects = [],
  isLoading: loadingIntrPrgProspects,
  error: errorIntrPrgProspects,
} = useQuery({
  queryKey: ["intrPrgProspects"],
  queryFn: async () => {
    const response = await axiosInstance.get("intrprgcall");
    return response.data;
  },
});

// Fetch Counts
const { data: prospectCount = [] } = useQuery({
  queryKey: ["prospectCount"],
  queryFn: async () => {
    const response = await axiosInstance.get("count_prospect");
    return response.data.count;
  },
});

const { data: pendingCount = [] } = useQuery({
  queryKey: ["pendingCount"],
  queryFn: async () => {
    const response = await axiosInstance.get("count_pending");
    return response.data.count;
  },
});

const { data: expiredCount = [] } = useQuery({
  queryKey: ["expiredCount"],
  queryFn: async () => {
    const response = await axiosInstance.get("count_expired");
    return response.data.count;
  },
});


  // Fetch Paid Count
  const { data: paidCount = [] } = useQuery({
    queryKey: ["paidCount"],
    queryFn: async () => {
      const response = await axiosInstance.get("count_paid");
      return response.data.count;
    },
  });

  // Handle Check-in
  const checkInMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.put(`/prospects/checkin/${id}`);
      return response.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(["prospects"]);
      const previousData = queryClient.getQueryData(["prospects"]);
      queryClient.setQueryData(["prospects"], (old) =>
        old.map((prospect) =>
          prospect.id === id
            ? { ...prospect, tgl_checkin: new Date().toISOString() }
            : prospect
        )
      );
      return { previousData };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["prospects"], context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["prospects"]);
    },
  });

  const handleCheckin = async (id) => {
    MySwal.fire({
      title: "Processing Check-in...",
      text: "Sedang mengirim Check-in",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      await checkInMutation.mutateAsync(id);
      MySwal.fire({
        title: "Check-in Berhasil",
        text: "Anda telah berhasil check-in",
        icon: "success",
      });
    } catch {
      MySwal.fire({
        title: "Gagal Check-in",
        text: "Terjadi kesalahan saat melakukan check-in",
        icon: "error",
      });
    } finally {
      MySwal.close();
    }
  };

  // Update Prospect
  const updateProspectMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await axiosInstance.put(`prospect/${id}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["prospects"]);
    },
  });

  const updateProspect = (id, updatedData) =>
    updateProspectMutation.mutateAsync({ id, updatedData });

  // Register User
  const registerUserMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("register", data);
      return response.data;
    },
  });

  const registerUser = async (data) => {
    MySwal.fire({
      title: "Registering User...",
      text: "Sedang mendaftarkan pengguna",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      await registerUserMutation.mutateAsync(data);
      MySwal.fire({
        title: "Registrasi Berhasil",
        text: "Pendaftaran berhasil dilakukan",
        icon: "success",
      });
    } catch {
      MySwal.fire({
        title: "Registrasi Gagal",
        text: "Terjadi kesalahan saat registrasi",
        icon: "error",
      });
    } finally {
      MySwal.close();
    }
  };

  // Manual Payment
  const paymentManualMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("manual", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["prospects"]);
    },
  });

  const paymentManual = async (data) => {
    MySwal.fire({
      title: "Processing Payment...",
      text: "Sedang memproses pembayaran manual",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      await paymentManualMutation.mutateAsync(data);
      MySwal.fire({
        title: "Pembayaran Berhasil",
        text: "Pembayaran manual berhasil",
        icon: "success",
      });
    } catch {
      MySwal.fire({
        title: "Pembayaran Gagal",
        text: "Terjadi kesalahan saat pembayaran",
        icon: "error",
      });
    } finally {
      MySwal.close();
    }
  };

  // Update Manual Payment
  const updatePaymentManualMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put("payment/update", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["prospects"]);
    },
  });

  const updatePaymentManual = async (data) => {
    MySwal.fire({
      title: "Processing Payment Update...",
      text: "Sedang memperbarui pembayaran",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      await updatePaymentManualMutation.mutateAsync(data);
      MySwal.fire({
        title: "Pembayaran Diperbarui",
        text: "Pembayaran berhasil diperbarui",
        icon: "success",
      });
    } catch {
      MySwal.fire({
        title: "Gagal Memperbarui",
        text: "Terjadi kesalahan saat memperbarui pembayaran",
        icon: "error",
      });
    } finally {
      MySwal.close();
    }
  };


  

  const filterProspects = (filters) => {
    const { startDate, endDate, ...otherFilters } = filters;

    return prospects.filter((item) => {
      const itemDate = new Date(item.created_at);

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const withinDateRange =
        (!start || itemDate >= start) && (!end || itemDate <= end);

      const matchesFilters = Object.entries(otherFilters).every(
        ([key, value]) => !value || item[key] === value
      );

      return withinDateRange && matchesFilters;
    });
  };

  // Apply filters to spprospects
  useEffect(() => {
    const applyFilters = () => {
      const result = spprospects.filter((item) => {
        const itemDate = new Date(item.created_at);
        const start = filters.startDate ? new Date(filters.startDate) : null;
        const end = filters.endDate ? new Date(filters.endDate) : null;

        const withinDateRange =
          (!start || itemDate >= start) && (!end || itemDate <= end);

        const matchesFilters = Object.entries(filters).every(
          ([key, value]) => !value || item[key] === value
        );

        return withinDateRange && matchesFilters;
      });
      setFilteredSPProspects(result);
    };

    applyFilters();
  }, [filters, spprospects]);

  return (
    <ProspectContext.Provider
      value={{
        prospects,
        handleCheckin,
        registerUser,
        spprospects,
        prgprospects,
        intrprgprospects,
        filteredSPProspects,
        loading: loadingProspects || loadingSPProspects || loadingPrgProspects || loadingIntrPrgProspects,
        error: errorProspects || errorSPProspects || errorPrgProspects || errorIntrPrgProspects,
        updateProspect,
        filterProspects,
        prospectCount,
        pendingCount,
        expiredCount,
        paidCount,
        filters,
        setFilters,
        paymentManual,
    updatePaymentManual,
      }}
    >
      {children}
    </ProspectContext.Provider>
  );
};


// Kode Lama

// const [filters, setFilters] = useState({
//   startDate: "",
//   endDate: "",
//   branch_name: "",
//   city_name: "",
//   status: "",
//   source: "",
// });
// const [filteredSPProspects, setFilteredSPProspects] = useState([]);
// const MySwal = withReactContent(Swal);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const responseProspects = await axiosInstance.get("prospect");
//       setProspects(responseProspects.data);

//       const responseSPProspects = await axiosInstance.get("spcall");
//       setSPProspects(responseSPProspects.data);

//       const responsePrgProspects = await axiosInstance.get("prgcall");
//       setPrgProspects(responsePrgProspects.data);
      
//       const responseIntrPrgProspects = await axiosInstance.get("intrprgcall");
//       setIntrPrgProspects(responseIntrPrgProspects.data);
      

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error);
//       setLoading(false);
//     }
//   };

//   const fetchProspectCount = async () => {
//     try {
//       const response = await axiosInstance.get("count_prospect");
//       setProspectCount(response.data.count);
//     } catch (error) {
//       console.error("Error fetching prospect count:", error);
//       setError(error);
//     }
//   };

//   const fetchPendingCount = async () => {
//     try {
//       const response = await axiosInstance.get("count_pending");
//       setPendingCount(response.data.count);
//     } catch (error) {
//       console.error("Error fetching prospect count:", error);
//       setError(error);
//     }
//   };

//   const fetchExpiredCount = async () => {
//     try {
//       const response = await axiosInstance.get("count_expired");
//       setExpiredCount(response.data.count);
//     } catch (error) {
//       console.error("Error fetching prospect count:", error);
//       setError(error);
//     }
//   };

//   const fetchPaidCount = async () => {
//     try {
//       const response = await axiosInstance.get("count_paid");
//       setPaidCount(response.data.count);
//     } catch (error) {
//       console.error("Error fetching prospect count:", error);
//       setError(error);
//     }
//   };

//   fetchData();
//   fetchPaidCount();
//   fetchExpiredCount();
//   fetchPendingCount();
//   fetchProspectCount();
// }, []);

// const handleCheckin = async (id) => {
//   MySwal.fire({
//      title: "Processing Checkin...",
//      text: "Sedang mengirim Checkin",
//      allowOutsideClick: false,
//      showConfirmButton: false,
//      didOpen: () => {
//        MySwal.showLoading();
//      },
//    });
  
//  try {
//    const response = await axiosInstance.put(`/prospects/checkin/${id}`);

//    setProspects((prevProspects) =>
//      prevProspects.map((prospect) =>
//        prospect.id === id
//          ? { ...prospect, tgl_checkin: response.data.prospect.tgl_checkin }
//          : prospect
//      )
//    );

//    setSPProspects((prevSPProspects) =>
//      prevSPProspects.map((prospect) =>
//        prospect.id === id
//          ? { ...prospect, tgl_checkin: response.data.prospect.tgl_checkin }
//          : prospect
//      )
//    );

   // setPrgProspects((prevSPProspects) =>
   //   prevSPProspects.map((prospect) =>
   //     prospect.id === id
   //       ? { ...prospect, tgl_checkin: response.data.prospect.tgl_checkin }
   //       : prospect
   //   ));
   // window.location.reload();


  
//    const updatedPrgProspects = await axiosInstance.get("spcall");
//   setPrgProspects(updatedPrgProspects.data);

//   MySwal.fire({
//     title: "Check In",
//     text: "Anda telah berhasil check in",
//     icon: "success",
//   });
  
//    return response.data;
//  } catch (error) {
//    console.error("Error checking in prospect:", error);
//    setError(error);
//  } finally {
//    setLoading(false);
//    MySwal.close();
//    MySwal.fire({
//      title: "Check in",
//      text: "Anda telah berhasil check in",
//      icon: "success",
//    });
//  }
// };

// const updateProspect = async (id, updatedData) => {
//   console.log("updateprospect :", updatedData);
//   try {
//     const response = await axiosInstance.put(`prospect/${id}`, updatedData);
//     const updatedProspect = response.data;

//     setProspects((prevProspects) =>
//       prevProspects.map((prospect) =>
//         prospect.id === id
//           ? { ...prospect, ...updatedData, ...updatedProspect }
//           : prospect
//       )
//     );

//     return updatedProspect;
//   } catch (error) {
//     console.error("Error updating prospect:", error);
//     setError(error);
//   }
// };

// const registerUser = async (data) => {
//   try {
//     MySwal.fire({
//       title: "Logging in...",
//       text: "Sedang mengirim Sign Up",
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       didOpen: () => {
//         MySwal.showLoading();
//       },
//     });
  
//     setLoading(true);
//     console.log("Register User", data);
//     const response = await axiosInstance.post("register", data);
    
//     if (response.status === 201) {
//       setRegistprospects((prev) => [...prev, response.data.user]);
//       window.location.reload();
//     }
//   } catch (error) {
//     console.error("Error registering user", error);
//     MySwal.close();
//     MySwal.fire({
//       title: "Sign Up",
//       text: "Anda telah gagal mengirim Sign Up",
//       icon: "error",
//     });
//     // alert("Failed to register user");
//   } finally {
//     MySwal.fire({
//       title: "Sign Up",
//       text: "Anda telah berhasil mengirim Sign Up",
//       icon: "success",
//     });
//     setLoading(false);
//   }
// };