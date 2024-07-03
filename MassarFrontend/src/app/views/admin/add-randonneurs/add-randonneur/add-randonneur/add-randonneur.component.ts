import { Component, Inject, OnInit } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Randonneur } from 'src/app/models/randonneur';
import { RandonneurServService } from 'src/app/services/randonneur-serv.service';
import { FileUploadServiceService } from 'src/app/services/file-upload-service.service';

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
user!:any
errorMsg : string=""
idRandonneur:any
constructor(private randonneurService:RandonneurServService,private router:Router,private fb:UntypedFormBuilder,private http: HttpClient) { 
    
   
}

ngOnInit(): void {
  this.refreshRandonneursData();
  this.loginForm=this.fb.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required]],
    nom:["",[Validators.required]],
    adresse:["",[Validators.required]],
  })
  this.randonneurService.getRandonneur().subscribe(data=>{
  
    this.dataArray=data
    
    
  })
}
sendEmail(form: NgForm) {
  const to = form.value.to;
  const cc = form.value.cc ? [form.value.cc] : [];
  const subject = form.value.subject;
  const body = form.value.body;
  // hnee hawil dima hot les atrebut li chtab3ath'hom lil back fard objet kima l email w e9bilhom b request body
  const email = {
    to: to,
    cc: cc,
    subject: subject,
    body: body
  }
  this.http.post('http://localhost:8080/auth/send', email).subscribe(
      (response: any) => console.log("response")
    );
  form.resetForm();
}
add() {
  let data = this.loginForm.value;


  if (data.nom=== '') {
    this.errorMsg = "Le champ est vide";
    return; 
  }

  console.log(data);

  this.ds.addUser(data).subscribe(
    response => {
      this.refreshAssociationsData();
this.ngOnInit();
    },
    (err: HttpErrorResponse) => {
      this.messageErr = err.error;
    }
  );
}

onDeleteUser(idUserToDelete:number){
this.idUserDeleteConfirm=idUserToDelete

}
ConfirmDelete(){
this.ds.deleteUser( this.idUserDeleteConfirm).subscribe((deleteUser)=>(console.log("besoin deleted"))
)
this.ds.getAssociations().subscribe(data=>{

this.dataArray=data
this.refreshAssociationsData();
this.ngOnInit();
})
this.reloadData();
this.router.navigate(["/admin/association"])

}
reloadData() {
throw new Error('Method not implemented.');
}
ConfirmDeleteBesoin(idBesoin:number){

}
details(idUser:any){


this.user= new RegisterRequest()
this.ds.getUserById(idUser).subscribe(data=>{
  console.log(data)
  this.user=data
  console.log(idUser)
  
})
}
refreshAssociationsData(){
this.ds.dispatchGetAllAssociations()
}
ngOnDestroy(): void {
this.destoyed$.next(true);
this.destoyed$.unsubscribe();
}
}
