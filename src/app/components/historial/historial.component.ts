import { Component, OnInit } from '@angular/core';
import { TransferenciaService } from '../../services/transferencia.service';
import { ITransferencia } from '../../models/itransferencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  templateUrl: '../../components/historial/historial.component.html',
  styleUrls: ['../../components/historial/historial.component.css']  
})
export class HistorialComponent implements OnInit {

  public isLoading : boolean = true;
  public listBanks : Array<any> = [];
  public listTransfers : Array<ITransferencia> = [];
  
  constructor(private listHistorial: TransferenciaService) { }

  ngOnInit(): void {
    this.cargarHistorialTranferencias();
  }

  cargarHistorialTranferencias() {

    this.listHistorial.getAll().subscribe((data : any) => {
      this.isLoading = true;
      let listaTransferencia :  Array<ITransferencia> = [];
      data.forEach(function(destinatario){ 
        destinatario.transfers.forEach(function(transfer) { 
          let transferencia : any = [];
          transferencia.rut = destinatario.rut;
          transferencia.name = destinatario.name;
          transferencia.createdAt = transfer.createdAt; 
          transferencia.bankName = destinatario.bankName;
          transferencia.accountType = destinatario.accountType;
          transferencia.amount = transfer.amount;
          listaTransferencia.push(transferencia);
        });
      });
      this.listTransfers = listaTransferencia;
      this.isLoading = false;

    }, error => {
      this.isLoading = false;
      Swal.fire('Error', 'No fue posible cargar la lista de transferencias', 'error');
    });
  }

}


