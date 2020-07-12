import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario:UsuarioModel;
  recordarme=false;
  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.usuario=new UsuarioModel();
    //this.usuario.email="omareyes-96@hotmail.com";
   }
   onSubmit(form:NgForm){
     if (form.invalid){
       return ;
     }
     Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      text:'Espere Porfavor....'
     })
     Swal.showLoading();
    this.auth.nuevoUsuario(this.usuario).subscribe(
      response=>{
        console.log(response);
        Swal.close();

        if(this.recordarme){
          localStorage.setItem('email',this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      },
      err=>{
        console.log(err.error.error.message);
        Swal.fire({
          title:'Error al Autenticar....',
          icon:'error',
          text:err.error.error.message
        })
      }
    );
   }

}