import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinatarioService } from '../../services/destinatario.service';
import { ListBanksService } from '../../services/list-banks.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-destinatario',
  templateUrl: '../../components/destinatario/destinatario.component.html',
  styleUrls: ['../../components/destinatario/destinatario.component.css']    
})
export class DestinatarioComponent implements OnInit {

  registrationForm : FormGroup | undefined;
  public isLoading : boolean = false;
  listBanks : Array<any> = [];

  constructor(private form : FormBuilder,
              private listBanksService: ListBanksService,
              private destinatarioService: DestinatarioService) { }

  ngOnInit(): void {
    this.registrationForm = this.form.group({
        name : new FormControl('', Validators.required),
        rut : new FormControl('', Validators.required),
        email : new FormControl('', Validators.required),
        phoneNumber : new FormControl('', Validators.required),
        bankName : new FormControl('', Validators.required),
        accountType : new FormControl('', Validators.required),
        accountNumber : new FormControl('', Validators.required)
    });

    this.loadListBanks();
  }

  registrarDestinatario() {
    this.isLoading = true;
    const data: any = {
        name : this.registrationForm.value.name,
        rut : this.registrationForm.value.rut,
        email : this.registrationForm.value.email,
        phoneNumber : this.registrationForm.value.phoneNumber,
        bankName : this.registrationForm.value.bankName,
        accountType : this.registrationForm.value.accountType,
        accountNumber : this.registrationForm.value.accountNumber
    };

    this.destinatarioService.create(data).subscribe(response =>{

    this.clearForm();
    this.isLoading = false;
    Swal.fire('Nuevo destinagtario', 'Destinatario ' + data.name + ' creado satisfactoriamente' , 'success');

    }, error => {
        if (error.status==0) {
          Swal.fire('Error', 'Conexión no establecida con el servidor. Contacte al administrador del sistema', 'error');
        } else if (error.status==422) {
          Swal.fire('Error', 'Registro duplicado, verifique el Rut, Mail o Número de Cuenta', 'error');
        } else {
          Swal.fire('Error', error.message, 'error');
        }
        this.isLoading = false;
   });
  }

  clearForm() {
    this.registrationForm.reset();
  }

  loadListBanks() {
    this.listBanksService.getAll().subscribe((data : any) => {
      this.listBanks = data.banks;
    }, error => {
      Swal.fire('Error', 'No fue posible cargar la lista de bancos', 'error');
    });
  }
}
