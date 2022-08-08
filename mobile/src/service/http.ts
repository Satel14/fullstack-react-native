import axios from "axios";
import TokenService from "../service/asyncstorage";

class HttpService {
    baseUrl: string;
    fetchingService: typeof axios;
    apiVersion: string;
    constructor(
        baseUrl: string,
        fetchingService: typeof axios,
        apiVersion: string,
    ) {
      this.baseUrl = baseUrl;
      this.fetchingService = fetchingService;
      this.apiVersion = apiVersion;
    }
    private getFullApiUrl(id: string) {
      return `${this.baseUrl}/${this.apiVersion}/${id}`;
    }
    private async popularTokenToHeader() {
      const token = await TokenService.getToken();
      return { Authorization: `Bearer ${token}` };
    }
    get(id: string) {
      return this.fetchingService.get(this.getFullApiUrl(id));
    }
    public async put<T>(url: string, id: string, body: T) {
      const config = await this.popularTokenToHeader();
      return this.fetchingService.put(this.getFullApiUrl(id), body, {
        headers: config,
      });
    }
    public async post<T>(url: string, body: T) {
      const config = await this.popularTokenToHeader();
      return this.fetchingService.post(this.getFullApiUrl(url), body, {
        headers: config,
      });
    }
    public async delete( id: string) {
      const config = await this.popularTokenToHeader();
      return this.fetchingService.delete(this.getFullApiUrl(id), {
        headers: config,
      });
    }

    privateHeaderConfig(data:any):any {
      return {
        method: "PUT",
        header: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    }
}

export default HttpService;
