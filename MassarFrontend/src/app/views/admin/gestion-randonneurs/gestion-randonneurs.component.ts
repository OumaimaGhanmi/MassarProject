import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Randonneur } from 'src/app/models/randonneur';
import { RandonneurServService } from 'src/app/services/randonneur-serv.service';
import { FileUploadServiceService } from 'src/app/services/file-upload-service.service';

@Component({
  selector: 'app-gestion-randonneurs',
  templateUrl: './gestion-randonneurs.component.html',
  styleUrls: ['./gestion-randonneurs.component.css']
})
export class GestionRandonneursComponent implements OnInit {
  idRandonneurDeleteConfirm = 0;
  randonneurList: Randonneur[] = [];
  showDeleteConfirmation = false;
  datarandonneur={
    idRandonneur:0,
    firstName:'',
    lastName:'',
    email:'',
    age:'',
    tel:'',
    address:'',
    image:'',
    admin:{
      idAdmin:0,
      list_Randonneur:new Set<Randonneur>()

    }
    
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private randonneurService: RandonneurServService,
    private fileUploadService: FileUploadServiceService,
    @Inject('BaseURL') public baseURL: any
  ) {}

  ngOnInit(): void {
    this.refreshRandonneurData();
  }

  onDeleteRandonneur(idRandonneurToDelete: number): void {
    this.idRandonneurDeleteConfirm = idRandonneurToDelete;
    this.showDeleteConfirmation = true;
  }

  confirmDelete(): void {
    this.randonneurService.deleteRandonneur(this.idRandonneurDeleteConfirm).subscribe(() => {
      console.log('Randonneur supprimé');
      this.refreshRandonneurData();
      this.showDeleteConfirmation = false;
    });
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
  }

  refreshRandonneurData(): void {
    this.randonneurService.getRandonneur().subscribe(data => {
      this.randonneurList = data;
    });
  }
  getdata(idRandonneur:any,firstName:string,lastName:any,email:any,age:any,tel:any,address:any){
    this.datarandonneur.idRandonneur=idRandonneur
    this.datarandonneur.firstName=firstName
    this.datarandonneur.lastName=lastName
    this.datarandonneur.email=email
    this.datarandonneur.age=age
    this.datarandonneur.tel=tel
    this.datarandonneur.address=address
    console.log(this.datarandonneur)

  }
}