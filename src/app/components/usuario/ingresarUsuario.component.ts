import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userLogin',
  templateUrl: '../../components/usuario/ingresarUsuario.Component.html',
  styleUrls: ['../../components/usuario/ingresarUsuario.component.css']
})
export class IngresarUsuarioComponent implements OnInit {

  registrationForm : FormGroup | undefined;
  
  constructor(private form : FormBuilder,
              private router : Router,
              private userService : UserService) { }

  ngOnInit(): void {
    this.registrationForm = this.form.group({
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }

  ingresarUsuario() {

      const data: any = {
        email : this.registrationForm.value.email,
        password : this.registrationForm.value.password
      };

      this.userService.ingresar(data).subscribe(res =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/destinatario']);

        }, error => {
            if (error.status==0) {
              Swal.fire('Error', 'Conexión no establecida con el servidor. Contacte al administrador del sistema', 'error');
            } else if (error.status==401) {
              Swal.fire('Error', 'Mail o contraseña invalida', 'error');
            } else {
              Swal.fire('Error', error.message, 'error');
            }
        });
  }
}
