import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Randonneur } from 'src/app/models/randonneur';
import { RandonneurServService } from 'src/app/services/randonneur-serv.service';

@Component({
  selector: 'app-edit-randonneur',
  templateUrl: './edit-randonneur.component.html',
  styleUrls: ['./edit-randonneur.component.css']
})
export class EditRandonneurComponent implements OnInit {
  loginForm!: FormGroup;
  messageErr = "";
  dataRandonneur: Randonneur = {
    idRandonneur: 0,
    firstname: '',
    lastname: '',
    email: '',
    password:'',
    age: 0,
    tel: 0,
    address: '',
    image: '',
    admin: {  // Assurez-vous de fournir toutes les propriétés nécessaires pour Admin
      idAdmin: 0,
      firstname: '',  // Exemple: Assurez-vous de définir firstname, lastname, etc.
      lastname: '',
      email: '',
      password: '',
      age: 0,
      tel: 0,
      address: '',
      list_Randonneur: new Set<Randonneur>(), // Initialisez list_Randonneur si nécessaire
      image: '' // Assurez-vous de définir toutes les propriétés requises
    }
  };

  constructor(
    private randonneurService: RandonneurServService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.refreshRandonneursData();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', Validators.required],
      tel: ['', Validators.required],
      address: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  refreshRandonneursData(): void {
    this.randonneurService.getRandonneur().subscribe(data => {
      // Peut-être initialiser dataRandonneur ici si nécessaire
    });
  }
  
  onEditRandonneur(form: any): void {
    this.dataRandonneur.idRandonneur = form.value.idRandonneur;
    this.dataRandonneur.firstname = form.value.firstname;
    this.dataRandonneur.lastname = form.value.lastname;
    this.dataRandonneur.email = form.value.email;
    this.dataRandonneur.age = form.value.age;
    this.dataRandonneur.tel = form.value.tel;
    this.dataRandonneur.address = form.value.address;
    this.dataRandonneur.image = form.value.image;
    this.dataRandonneur.password = form.value.password;

    // Gérer role si présent dans le formulaire
    if (form.value.role) {
      this.dataRandonneur.role = form.value.role;
    } else {
      this.dataRandonneur.role = undefined; // Assurez-vous de gérer correctement l'optionnel
    }

    // Gérer admin si présent dans le formulaire
    if (form.value.admin) {
      this.dataRandonneur.admin = form.value.admin;
    } else {
      // Gérer le cas où admin est absent ou non défini
      this.dataRandonneur.admin = {
        idAdmin: 0,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        age: 0,
        tel: 0,
        address: '',
        list_Randonneur: new Set<Randonneur>(),
        image: ''
      };
    }

    // Mettre à jour le randonneur via le service
    this.randonneurService.updateRandonneur(this.dataRandonneur.idRandonneur, this.dataRandonneur).subscribe({
      next: response => {
        console.log('Randonneur mis à jour avec succès !');
        this.refreshRandonneursData();
        // Réinitialiser le formulaire si nécessaire
        this.initForm();
      },
      error: err => {
        this.messageErr = err.error; // Gérer les erreurs comme vous le souhaitez
      }
    });
  }
}