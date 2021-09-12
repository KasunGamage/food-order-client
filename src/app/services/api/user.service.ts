import { Injectable } from "@angular/core";

import { HttpService } from "./http.service";
import { environment } from "../../../environments/environment";
import { UserAdd } from "../../model/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private httpService: HttpService) {}

  add(user: UserAdd) {
    const apiURL = environment.url + "users/add";
    return this.httpService.post(apiURL, user);
  }

  update(id: string, user: UserAdd) {
    const apiURL = environment.url + "users/update?userId=" + id;
    return this.httpService.put(apiURL, user);
  }

  delete(id: string) {
    const apiURL = environment.url + "users/delete?userId=" + id;
    return this.httpService.delete(apiURL);
  }

  findById(id: string) {
    const apiURL = environment.url + "users/findById?userId=" + id;
    return this.httpService.get(apiURL);
  }

  getAll() {
    const apiURL = environment.url + "users/getAll";
    return this.httpService.get(apiURL);
  }

  sendVerificationCode(mobile: number) {
    const apiURL = environment.url + "users/verification?mobile=" + mobile;
    return this.httpService.get(apiURL);
  }

  verifyCode(requestId: string, code: string) {
    const apiURL =
      environment.url + `users/verifyCode?requestId=${requestId}&code=${code}`;
    return this.httpService.get(apiURL);
  }
}
