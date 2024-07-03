import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Randonneur } from 'src/app/models/randonneur';
import { RandonneurServService } from 'src/app/services/randonneur-serv.service';
import { FileUploadServiceService } from 'src/app/services/file-upload-service.service';
@Component({
  selector: 'app-gestion-randonneurs',
  templateUrl: './gestion-randonneurs.component.html',
  styleUrls: ['./gestion-randonneurs.component.css']
})
export class GestionRandonneursComponent implements OnInit {
  errorMsg : string=""
  loginForm!: UntypedFormGroup;
  idRandonneur: any;
  idRandonneurDeleteConfirm=0
  randonneur!:Randonneur;
  randonneurs: Randonneur[] = []; // Déclaration d'un tableau de randonneurs
  //Variable for message duplicated email
  errMail: string="";
  /* upload file*/
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
 
  constructor(private http:HttpClient ,private router:Router,private randonneurService: RandonneurServService,
    private route: ActivatedRoute,private fileUploadService:FileUploadServiceService,
    
    @Inject('BaseURL') public baseURL:any){
    
  }
  randonneurList:Randonneur[]=[];
  ngOnInit(): void {
    this.refreshRandonneurData();
    this.randonneurService.getRandonneur().subscribe(data =>{
      this.randonneurList = data
      console.log(this.randonneurList)
      console.log(data)
     
     
     })
  }
  onDeleteRandonneur(idRandonneurToDelete:number){
    this.idRandonneurDeleteConfirm=idRandonneurToDelete
  
  }
  ConfirmDelete(){
  this.randonneurService.deleteRandonneur( this.idRandonneurDeleteConfirm).subscribe((deleteRandonneur)=>(console.log("Randonneur deleted"))
  )
 this.randonneurService.getRandonneur().subscribe(data=>{
  
  this.randonneurList=data
  this.refreshRandonneurData();
  this.ngOnInit();
})
this.reloadData();
this.router.navigate(["/admin/dashboard"])
 
}
reloadData() {
  throw new Error('Method not implemented.');
}
ConfirmDeleteRandonneur(idRandonneur:number){

}
refreshRandonneurData(){
  this.randonneurService.dispatchGetAllRandonneur()
}

  onContacts() {
    this.router.navigateByUrl("/randonneurs")
  }
    

onAddRandonneur(){
  this.router.navigateByUrl("")
}

//edit
onSubmit() {

 
  /*
  if (this.randonneur.idRandonneur == null) {
    this.randonneurService.addRandonneur(this.randonneur)
      .subscribe({
        next: (randonneur: Randonneur) => {
               this.errMail="";
               this.upload(randonneur);
        }
      })
  } else {
    this.randonneurService.updateRandonneur(this.randonneur)
      .subscribe({
        next: (randonneur: Randonneur) => {
          this.errMail="";
          this.upload(randonneur);
        }
      })
  };
*/
}
 

/*upload file*/
selectFile(event: any): void {

 this.selectedFiles = event.target.files;
}

upload(randonneur: Randonneur): void {
 
 this.progress = 0;


 if (this.selectedFiles) {
  
   const file: File | null = this.selectedFiles.item(0);

   if (file) {
   
     this.currentFile = file;

    
     this.fileUploadService.upload(this.currentFile,randonneur.idRandonneur).subscribe({
       next: (event: any) => {
         
         if (event.type === HttpEventType.UploadProgress) {
           this.progress = Math.round(100 * event.loaded / event.total);
         }
       
         else if (event instanceof HttpResponse) {
           this.message = event.body.message;
           
           this.router.navigateByUrl('/contacts/' + randonneur.idRandonneur);
    
         }
       },
       error: (err: any) => {
         // Handle error
         console.log(err);
         this.progress = 0;

         if (err.error && err.error.message) {
           this.message = err.error.message;
         } else {
           this.message = 'Could not upload the file!';
         }
         this.currentFile = undefined;
       }
     });
   } else {
     // Reset selectedFiles if no file is selected
     this.selectedFiles = undefined;
     // Redirect to contact details page
     this.router.navigateByUrl('/randonneurs/' + randonneur.idRandonneur);
    
   }
 } else {
   // Redirect to contact details page 
   this.router.navigateByUrl('/randonneurs/' +randonneur.idRandonneur);
   
 }
}
}
