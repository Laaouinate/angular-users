import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users:any;
  public userForm: FormGroup;
  page = 1;
  count = 0;
  tableSize = 7;
  tableSizes = [3, 6, 9, 12];

  constructor(private userservice:UserService,
              private formBuilder: FormBuilder) 
    { }

  ngOnInit(): void {
    this.getAllUsers();
    this.formUser();
  }

  getAllUsers():void {
    this.userservice.getAll().subscribe(data => {
      this.users = data;
    })
  }

  search(args):void {

    if( args.target.value.length === 0)
     {
          this.getAllUsers()
     } else {
          const value  = args.target.value;
          this.userservice.Search(value).subscribe( 
            data => { this.users = data } )
     }
  }

  formUser() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    })
   }

  Save(){

    let form =this.userForm.getRawValue();
    this.userservice.SaveUser(form).subscribe(
     response => { this.userForm.reset(); }
    );

  }

  deleteUser(id){
    let res = confirm("Êtes-vous sûr de vouloir supprimer?");
    if(res) {
   
    this.userservice.DeleteUser(id).subscribe(
      response => {
          this.users =  this.users.filter(user => user.id != id)
      })
    }
    
  }

  Clean() {
    this.userForm.reset();
  }


  onTableDataChange(event){
    this.page = event;
    this.getAllUsers();
  }  

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllUsers();
  }  

}
