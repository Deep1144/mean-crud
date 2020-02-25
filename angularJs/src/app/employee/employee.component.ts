import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../shared/employee.service";
import { NgForm } from "@angular/forms";
import { Employee } from "../shared/employee.model";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: ""
    };
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe(res => {
        this.resetForm(form);
      });
      this.refreshEmployeeList();
    }
    else{
      console.log("in on update");
      this.employeeService.putEmployee(form.value).subscribe(res=>{
        this.resetForm(form);
        console.log("in on update sucees");
      });
      this.refreshEmployeeList();
    }
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm("Confirm you want to Delete") == true) {
      this.employeeService.deleteEmployee(_id).subscribe(res => {
        this.resetForm(form);
        this.refreshEmployeeList();
        alert("deleted");
      });
    }
  }

  onUpdate(emp: Employee) {
    console.log("updated");
    this.employeeService.selectedEmployee = emp;
  }

  refreshEmployeeList() {
    var employeeDetails: Employee[];
    this.employeeService.getEmployeeList().subscribe(res => {
      // this.employeeService.employees=res as Employee[];
      employeeDetails = res as Employee[];

      employeeDetails = employeeDetails.filter(element => {
        if (
          element.name != null &&
          element.position != null &&
          element.name.length != 0
        ) {
          return element;
        }
      });

      this.employeeService.employees = employeeDetails;

      // console.log(this.employeeService.employees);
      // console.log(employeeDetails);
      // console.log(employeeDetails2);
      // this.employeeService.employees = res as Employee[];
      // this.employeeService.employees.forEach(element => {
      //   if(element.name == null){
      //   }
      //   else{
      //     employeeDetails.push(element);
      //   }
      // });
      // employeeDetails.forEach(element => {
      //   this.employeeService.filteredEmployee.push(element);
      // });
      // console.log(this.employeeService.filteredEmployee);
    });
  }
}
