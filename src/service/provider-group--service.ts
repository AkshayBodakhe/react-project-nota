import axiosInstance from "../interceptor/interceptor";

class ProviderGroupService {
  private BASE_PATH: string = "/api/master";
  private readonly X_TENANT_ID: string = "X-TENANT-ID";

  ////////////////////////////////////////////////////// Provider Group API's ////////////////////////////////////////////////////////////////

  getProviderGroupProfile = (providerGroupUuid: string) => {
    return axiosInstance.get(`${this.BASE_PATH}/auth/${providerGroupUuid}`);
  };

  getAllSpecialities = (_tenantId: string, page: number, size: number) => {
    return axiosInstance.get(`${this.BASE_PATH}/get/specialities`, {
      headers: {
        // [this.X_TENANT_ID]: tenantId
      },
      params: {
        page: page,
        size: size,
      },
    });
  };

  /////////////////////////////////////////////////////// Locations API's ////////////////////////////////////////////////////////////////////

  getAllLocations = (
    _tenantId: string,
    page: number,
    size: number,
    sortBy: string,
    sortDirection: string,
    searchString: string,
    providerGroupUuid: string | undefined
  ) => {
    return axiosInstance.get(
      `${this.BASE_PATH}/location/all/${providerGroupUuid}`,
      {
        headers: {
          // [this.X_TENANT_ID]: tenantId
        },
        params: {
          page: page,
          size: size,
          sortBy: sortBy,
          sortDirection: sortDirection,
          searchString: searchString,
        },
      }
    );
  };

  getLocationByUuid = (_tenantId: string, locationUuid: string) => {
    return axiosInstance.get(`${this.BASE_PATH}/location/${locationUuid}`, {
      headers: {
        // [this.X_TENANT_ID]: _tenantId
      },
    });
  };

  addUpdateLocation = (payload: any, _tenantId: string, type: string) => {
    if (type === "ADD") {
      return axiosInstance.post(`${this.BASE_PATH}/location`, payload, {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      });
    } else {
      return axiosInstance.put(`${this.BASE_PATH}/location`, payload, {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      });
    }
  };

  updateLocationStatus = (
    _tenantId: string,
    locationUuid: string,
    active: boolean
  ) => {
    return axiosInstance.put(
      `${this.BASE_PATH}/location/${locationUuid}/active/${active}`,
      "",
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      }
    );
  };

  /////////////////////////////////////////////////////// Departments API's ////////////////////////////////////////////////////////////////////

  getAllDepartments = (
    _tenantId: string,
    page: number,
    size: number,
    _providerGroupUuid?: string,
    sortBy?: string,
    sortDirection?: string,
    searchString?: string,
    locationId?: string
  ) => {
    return axiosInstance.get(
      `${this.BASE_PATH}/department/location/${locationId}/department`,
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
        params: {
          page: page,
          size: size,
          sortBy: sortBy,
          sortDirection: sortDirection,
          searchString: searchString,
          status: status,
        },
      }
    );
  };

  searchDepartmentByName = (locationId: string, departmentName?: string) => {
    return axiosInstance.get(
      `${this.BASE_PATH}/department/location/${locationId}`,
      {
        headers: {},
        params: {
          departmentName: departmentName,
        },
      }
    );
  };

  getAllDepartmentAdmins = (
    _tenantId: string,
    page: number,
    size: number,
    id: string | undefined
  ) => {
    return axiosInstance.get(
      `${this.BASE_PATH}/department/department-admins/${id}`,
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
        params: {
          page: page,
          size: size,
        },
      }
    );
  };

  addEditDepartment = (_tenantId: string, payload: any, type: string) => {
    if (type === "ADD") {
      return axiosInstance.post(`${this.BASE_PATH}/department`, payload, {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      });
    } else {
      return axiosInstance.put(`${this.BASE_PATH}/department`, payload, {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      });
    }
  };

  updateStatus = (
    _tenantId: string,
    departMentuuid: string,
    active: boolean
  ) => {
    //api/master/department/{uuid}/active/{active}
    return axiosInstance.put(
      `${this.BASE_PATH}/department/${departMentuuid}/active/${active}`,
      "",
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      }
    );
  };

  /////////////////////////////////////////////////////// Patients API's /////////////////////////////////////////////////////////////////////////

  getAllPatients = (
    _tenantId: string,
    page: number,
    size: number,
    sortBy?: string,
    sortDirection?: string,
    searchString?: string,
    status?: boolean
  ) => {
    return axiosInstance.get(`${this.BASE_PATH}/patient`, {
      headers: {
        // [this.X_TENANT_ID]: _tenantId
      },
      params: {
        page: page,
        size: size,
        sortBy: sortBy,
        sortDirection: sortDirection,
        searchString: searchString,
        status: status,
      },
    });
  };

  /////////////////////////////////////////////////////// Users API's ////////////////////////////////////////////////////////////////////////////

  getAllUsers = (
    _tenantId: string,
    page: number,
    size: number,
    searchString: string,
    providerGroupUuid: string | undefined
  ) => {
    return axiosInstance.get(`${this.BASE_PATH}/users`, {
      headers: {
        // [this.X_TENANT_ID]: tenantId
      },
      params: {
        page: page,
        size: size,
        searchString: searchString,
        providerGroupUuid: providerGroupUuid,
      },
    });
  };

  getProviderById = (_tenantId: string, providerUuid: string) => {
    return axiosInstance.get(
      `${this.BASE_PATH}/provider/user/${providerUuid}`,
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      }
    );
  };

  getUserById = (_tenantId: string, providerUuid: string) => {
    return axiosInstance.get(`${this.BASE_PATH}/user/${providerUuid}`, {
      headers: {
        // [this.X_TENANT_ID]: _tenantId
      },
    });
  };

  activateOrDeactivateUser = (
    _tenantId: string,
    status: boolean,
    email: string
  ) => {
    return axiosInstance.put(
      `${this.BASE_PATH}/user/${email}/active/${status}`,
      "",
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      }
    );
  };

  addUpdateUser = (
    _tenantId: string,
    payload: any,
    type: string,
    role: string
  ) => {
    if (type === "ADD") {
      return axiosInstance
        .post(`${this.BASE_PATH}/${role}`, payload, {
          headers: {
            // [this.X_TENANT_ID]: _tenantId
          },
        })
        .catch((_err) => {});
    } else {
      return axiosInstance.put(`${this.BASE_PATH}/${role}`, payload, {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      });
    }
  };

  getAllLicensedStates = (_tenantId: string) => {
    return axiosInstance.get(
      `${this.BASE_PATH}/insurance/all/licensed-states`,
      {
        headers: {
          // [this.X_TENANT_ID]: tenantId
        },
      }
    );
  };

  getAllInsuranceAccepted = (_tenanId: string, page: number, size: 10) => {
    return axiosInstance.get(`${this.BASE_PATH}/insurance/payers`, {
      headers: {
        // [this.X_TENANT_ID]: tenanId
      },
      params: {
        page: page,
        size: size,
      },
    });
  };

  getAllRolesWithDefault = (
    _tenanId: string,
    page: number,
    size: number,
    id: string | undefined
  ) => {
    return axiosInstance.get(`${this.BASE_PATH}/role/get/all`, {
      headers: {
        // [this.X_TENANT_ID]: tenanId
      },
      params: {
        page: page,
        size: size,
        providerGroupUuid: id,
      },
    });
  };

  deleteUser = (_tenanId: string, type: string, uuid: string) => {
    return axiosInstance.delete(`${this.BASE_PATH}/${type}/${uuid}`, {
      headers: {
        // [this.X_TENANT_ID]: tenanId
      },
    });
  };

  /////////////////////////////////////////////////////// Location Departments API's /////////////////////////////////////////////////////////////

  getAllLocationDepartments = (
    _tenantId: string,
    locationUuid: string,
    page: number,
    size: number
  ) => {
    return axiosInstance.get(
      `${this.BASE_PATH}/department/location/${locationUuid}/department`,
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
        params: {
          page: page,
          size: size,
        },
      }
    );
  };

  assignLocationDepartment = (
    _tenantId: string,
    locationId: string,
    departmentId: string
  ) => {
    return axiosInstance.post(
      `${this.BASE_PATH}/department/location/${locationId}/${departmentId}`,
      "",
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      }
    );
  };

  /////////////////////////////////////////////////////// Location Patients API's ///////////////////////////////////////////////////////////////

  getLocationPatients = (_tenantId: string, locationUuid: string) => {
    return axiosInstance.get(
      `${this.BASE_PATH}/patient/location/${locationUuid}/patient`,
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      }
    );
  };

  // getAllDepartmentAdmins = (_tenantId: string, page: number, size: number,id:string | undefined) => {

  //     return axiosInstance.get(`${this.BASE_PATH}/department/department-admins/${id}`, {
  //         headers: {
  //             // [this.X_TENANT_ID]: _tenantId
  //         },
  //         params: {
  //             page: page,
  //             size: size
  //         }
  //     })
  // }
  /////////////////////////////////////////////////////// Location Users API's /////////////////////////////////////////////////////////////

  getLocationUsers = (
    _tenantId: string,
    locationUuid: string,
    page: number,
    size: number
  ) => {
    return axiosInstance.get(
      `${this.BASE_PATH}/location/${locationUuid}/user`,
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
        params: {
          page: page,
          size: size,
        },
      }
    );
  };

  assignLocationUser = (
    _tenantId: string,
    locationUuid: string,
    userId: string
  ) => {
    return axiosInstance.post(
      `${this.BASE_PATH}/location/${locationUuid}/${userId}`,
      "",
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
      }
    );
  };

  uploadDocument = (formData: FormData) => {
    return (
      axiosInstance.post(`${this.BASE_PATH}/document`, formData),
      {
        headers: {},
      }
    );
  };

  makePayment = (paymentData: any, patientUuid: any) => {
    return axiosInstance.post(
      `${this.BASE_PATH}/patient/add-card`,
      paymentData,
      {
        headers: {},
        params: {
          patientUuid: patientUuid,
        },
      }
    );
  };

  uploadDocumentForPatient = async (formData: FormData) => {
    try {
      const response = await axiosInstance.post(
        `${this.BASE_PATH}/patient-document/patient`,
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  locationSearchAPI = (
    _tenantId: string,
    locationId: string,
    name: string,
    page: number,
    size: number
  ) => {
    // return axiosInstance.get(`${this.BASE_PATH}/location/${locationId}/${name}`, {
    //     headers: {
    // [this.X_TENANT_ID]: _tenantId
    //     },
    //     params: {
    //         page: page,
    //         size: size
    //     }
    // })
    return axiosInstance.get(
      `${this.BASE_PATH}/department/location/${locationId}/${name}`,
      {
        headers: {
          // [this.X_TENANT_ID]: tenantId
        },
        params: {
          page: page,
          size: size,
        },
      }
    );
  };

  searchLocationUsers = (
    _tenantId: string,
    locationId: string,
    name: string,
    page: number,
    size: number
  ) => {
    // return axiosInstance.get(`${this.BASE_PATH}/location/${locationId}/${name}`, {
    //     headers: {
    // [this.X_TENANT_ID]: _tenantId
    //     },
    //     params: {
    //         page: page,
    //         size: size
    //     }
    // })
    return axiosInstance.get(
      `${this.BASE_PATH}/search/location/${locationId}`,
      {
        headers: {
          // [this.X_TENANT_ID]: _tenantId
        },
        params: {
          page: page,
          size: size,
          username: name,
        },
      }
    );
  };

  /////////////////////////////////////////////////////// Refresh Token API's /////////////////////////////////////////////////////////////

  getRefreshToken = (refreshToken: string) => {
    return axiosInstance.post(
      `${this.BASE_PATH}/refresh-token`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
}

const providerGroupService = new ProviderGroupService();
Object.freeze(providerGroupService);

export default providerGroupService;
