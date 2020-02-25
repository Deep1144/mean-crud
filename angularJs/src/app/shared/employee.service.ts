import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

// import 'rxjs/add/operator/toPromise';

import {Employee} from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee:Employee;
  employees : Employee[];

  filteredEmployee : Employee[];
  readonly baseURL ="http://localhost:5000/";

  constructor(private http : HttpClient) {}

  postEmployee(emp :Employee){
    return this.http.post(this.baseURL,emp);
  }

  getEmployeeList(){
    return this.http.get(this.baseURL);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `${_id}`);
  }

  putEmployee(emp: Employee) {
    console.log(emp);
    console.log(emp._id);
    return this.http.put(this.baseURL + `${emp._id}`, emp);
  }

}
