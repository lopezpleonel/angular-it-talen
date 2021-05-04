import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userRegister',
  templateUrl: '../../components/usuario/registrarUsuario.component.html',
  styleUrls: ['../../components/usuario/registrarUsuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  registrationForm : FormGroup | undefined;
  user = {}
  
  constructor(private router: Router,
              private form : FormBuilder,
              private userService : UserService) { }

  ngOnInit(): void {
    this.registrationForm = this.form.group({
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      passwordValidator : new FormControl('', Validators.required)
    });
  }

  registrarUsuario() {

      const data: any = {
        email : this.registrationForm.value.email,
        password : this.registrationForm.value.password,
        passwordValidator : this.registrationForm.value.passwordValidator
      };
    
      if (data.password === data.passwordValidator) {
        this.userService.registrar(data).subscribe(res =>{
          localStorage.setItem('token', res.token);
          this.router.navigate(['/destinatario']);
          Swal.fire('Registrar', 'Usuario con mail ' + data.email + ' registrado satisfactoriamente' , 'success');
      
          }, error => {
              if (error.status==0) {
                Swal.fire('Error', 'Conexión no establecida con el servidor. Contacte al administrador del sistema', 'error');
              } else if (error.status==409) {
                Swal.fire('Error', 'El Mail '+ data.email + ' ya se encuentra regitrado', 'warning');
              } else {
                Swal.fire('Error', error.message, 'error');
              }
         });
      } else {
        Swal.fire('Registrar', 'Las contraseñas no coinciden' , 'info');
      }
  }
}
