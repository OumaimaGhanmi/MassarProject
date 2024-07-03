import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Randonneur } from 'src/app/models/randonneur';
import { RandonneurServService } from 'src/app/services/randonneur-serv.service';
import { FileUploadServiceService } from 'src/app/services/file-upload-service.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-randonneur',
  templateUrl: './add-randonneur.component.html',
  styleUrls: ['./add-randonneur.component.css']
})
export class AddRandonneurComponent implements OnInit {
  destoyed$ = new Subject<boolean>();
  
  messageErr=""
  loginForm!: UntypedFormGroup;
  errors!:string;
  idRandonneurDeleteConfirm=0
  dataRandonneur:any=[]
  randonneur!:any
  errorMsg : string=""
  idRandonneur:any
constructor(private randonneurService:RandonneurServService,private router:Router,
            private fb:UntypedFormBuilder,private http: HttpClient) { }

ngOnInit(): void {
  this.refreshRandonneursData();
  this.loginForm=this.fb.group({
    firstname:["",[Validators.required]],
    lastname:["",[Validators.required]],
    password:["",[Validators.required]],
    email:["",[Validators.required,Validators.email]],
    age:["",[Validators.required]],
    tel:["",[Validators.required]],
    
   
    adresse:["",[Validators.required]],
  })
  this.randonneurService.getRandonneur().subscribe(data=>{
  
    this.dataRandonneur=data
    
    
  })
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
