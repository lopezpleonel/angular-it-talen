import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransferenciaService } from '../../services/transferencia.service';
import { DestinatarioService } from '../../services/destinatario.service';
import { IDestinatario } from '../../models/iDestinatario';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferencia',
  templateUrl: '../../components/transferencia/transferencia.component.html',
  styleUrls: ['../../components/transferencia/transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  public isLoading : boolean = false;
  registrationForm : FormGroup | undefined;
  public listDestinatarios : Array<any> = [];
  public selectedDestinatario : IDestinatario;

  constructor(private form : FormBuilder,
              private transferenciaService : TransferenciaService,
              private destinatarioService : DestinatarioService) { }

  ngOnInit(): void {
    this.registrationForm = this.form.group({
      searchName : new FormControl('', Validators.required),
      name : new FormControl('', Validators.required),
      rut : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      bankName : new FormControl('', Validators.required),
      accountType : new FormControl('', Validators.required),
      amount : new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
    this.cargarDestinatarios();
  }

  registrarTransferencia() {
    if (this.selectedDestinatario._id && this.registrationForm.value.amount>0) {
      this.isLoading = true;
      const data: any = {
        amount : this.registrationForm.value.amount,
      };
    
      this.transferenciaService.create(data, this.selectedDestinatario._id).subscribe(() =>{
        Swal.fire('Transferencia', 'Transferencia del destinatario ' + this.registrationForm.value.name + ' creada satisfactoriamente' , 'success');
        this.clearForm();
        this.isLoading = false;
    
        }, error => {
            if (error.status==0) {
              Swal.fire('Error', 'Conexión no establecida con el servidor. Contacte al administrador del sistema', 'error');
            } else {
              Swal.fire('Error', error.message, 'error');
            }
            this.isLoading = false;
       });
    } else {
      Swal.fire('Destinatario', 'No se recibió la información requerida para la transacción', 'error');
    }

  }

  cargarDestinatarios() {
    this.destinatarioService.getAll().subscribe((data : any) => {
      this.listDestinatarios = data;
    }, error => {
      Swal.fire('Error', 'No fue posible cargar la lista de destinatarios', 'error');
    });
  }

  getSelectedDestinatarioByRut(e): void {
    let rut = e.target.value;
    this.selectedDestinatario = this.listDestinatarios.find(destinatario => destinatario.rut === rut);
    if (this.selectedDestinatario) {
      this.registrationForm.controls.name.setValue(this.selectedDestinatario.name);
      this.registrationForm.controls.email.setValue(this.selectedDestinatario.email);
      this.registrationForm.controls.bankName.setValue(this.selectedDestinatario.bankName);
      this.registrationForm.controls.accountType.setValue(this.selectedDestinatario.accountType);
    } else {
      this.clearForm();
      Swal.fire('Destinatario', 'No se encontró un destinatario con el Rut ' + rut, 'info');
    }
  }

  clearForm() {
    this.registrationForm.reset();
  }

}
