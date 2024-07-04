import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { RandonneurServService } from 'src/app/services/randonneur-serv.service';
import { Randonneur } from 'src/app/models/randonneur';

@Component({
  selector: 'app-add-randonneur',
  templateUrl: './add-randonneur.component.html',
  styleUrls: ['./add-randonneur.component.css']
})
export class AddRandonneurComponent implements OnInit {
  loginForm!: FormGroup;
  dataRandonneur: any[] = [];
  randonneur!: Randonneur;
  messageErr: string = '';
  idRandonneurDeleteConfirm: number = 0;

  constructor(
    private randonneurService: RandonneurServService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.refreshRandonneursData();
    this.randonneurService.getRandonneur().subscribe(data => {
      this.dataRandonneur = data;
    });
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

  add(): void {
    if (this.loginForm.invalid) {
      return;
    }

    let data = this.loginForm.value;

    this.randonneurService.addRandonneur(data).subscribe(
      () => {
        this.refreshRandonneursData();
        this.initForm();
      },
      (err: HttpErrorResponse) => {
        this.messageErr = err.error;
      }
    );
  }

  onDeleteRandonneur(idRandonneurToDelete: number): void {
    this.idRandonneurDeleteConfirm = idRandonneurToDelete;
  }

  ConfirmDelete(): void {
    this.randonneurService.deleteRandonneur(this.idRandonneurDeleteConfirm).subscribe(() => {
      console.log("Randonneur deleted");
      this.refreshRandonneursData();
    });
    
    this.router.navigate(['/admin/GestionRandonneurs']);
  }

  refreshRandonneursData(): void {
    this.randonneurService.getRandonneur().subscribe(data => {
      this.dataRandonneur = data;
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
  }
}