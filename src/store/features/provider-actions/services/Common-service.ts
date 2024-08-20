import { PaginationState } from "../../../../components/common/enums-and-interfaces/interfaces";
import axiosInstance from "../../../../interceptor/interceptor";

class CommonService {

    private readonly BASE_URL = '/api/master';

    getData = async (
        endPoint: string,
        pagination: PaginationState
    ) => {

        const URL = `${this.BASE_URL}${endPoint}`;
        try {
            const response = await axiosInstance.get(URL, {
                params: {
                    page: pagination.page,
                    size: pagination.size,
                    sortBy: pagination.sortBy,
                    sortDirection: pagination.sortDirection,
                    searchString: pagination.searchString
                }
            });
            
            if (response.status >= 400) {
                throw new Error(response.data?.message || response.data?.code);
            }
            return response.data;
        } catch (error) {
            return Promise.reject(error)
        }

    }

}

const commonService = new CommonService;
Object.freeze(commonService);

export default commonService;