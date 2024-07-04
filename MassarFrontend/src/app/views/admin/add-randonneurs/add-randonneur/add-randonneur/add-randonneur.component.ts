import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

import { RandonneurServService } from 'src/app/services/randonneur-serv.service';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-randonneur',
  templateUrl: './add-randonneur.component.html',
  styleUrls: ['./add-randonneur.component.css']
})
export class AddRandonneurComponent implements OnInit {
  destoyed$ = new Subject<boolean>();
  
  messageErr=""
  loginForm!:FormGroup;
  errors!:string;
  idRandonneurDeleteConfirm=0
  dataRandonneur:any=[]
  randonneur!:any
  errorMsg : string=""
  idRandonneur:any
constructor(private randonneurService:RandonneurServService,private router:Router, private http: HttpClient,
            private formBuilder: FormBuilder) { }

ngOnInit(): void {
  this.refreshRandonneursData();
  
  this.randonneurService.getRandonneur().subscribe(data=>{
  
    this.dataRandonneur=data
    
    
  })
  this.initForm();
  
}

initForm(): void {
  this.loginForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    age: ['', Validators.required],
    tel: ['', Validators.required],
    address: ['', Validators.required]
  });
}
add() {
  let data = this.loginForm.value;


  if (data.nom=== '') {
    this.errorMsg = "Le champ est vide";
    return; 
  }

  console.log(data);

  this.randonneurService.addRandonneur(data).subscribe(
    response => {
      this.refreshRandonneursData();
this.ngOnInit();
    },
    (err: HttpErrorResponse) => {
      this.messageErr = err.error;
    }
  );
}

onDeleteRandonneur(idRandonneurToDelete:number){
this.idRandonneurDeleteConfirm=idRandonneurToDelete

}
ConfirmDelete(){
this.randonneurService.deleteRandonneur( this.idRandonneurDeleteConfirm).subscribe((deleteRandonneur)=>(console.log("Randonneur deleted"))
)
this.randonneurService.getRandonneur().subscribe(data=>{

this.dataRandonneur=data
this.refreshRandonneursData();
this.ngOnInit();
})
this.reloadData();
this.router.navigate(["/admin/gestionrandonneurs"])

}
reloadData() {
throw new Error('Method not implemented.');
}
ConfirmDeleteRandonneur(idRandonneur:number){

}
details(idUser:any){


this.randonneur= new User()
this.randonneurService.getRandonneurById(this.randonneur.idRandonneur).subscribe(data=>{
  console.log(data)
  this.randonneur=data
  
  
})
}
refreshRandonneursData(){
this.idRandonneur.dispatchGetAllAssociations()
}
ngOnDestroy(): void {
this.destoyed$.next(true);
this.destoyed$.unsubscribe();
}
}
