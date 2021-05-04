import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { HistorialComponent } from './components/historial/historial.component';
import { TransferenciaComponent } from './components/transferencia/transferencia.component';
import { IngresarUsuarioComponent } from './components/usuario/ingresarUsuario.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrarUsuario.component';


const routes: Routes = [
    {path: '', component: IngresarUsuarioComponent},
    {path: 'historial', component: HistorialComponent, canActivate : [AuthGuard]},
    {path: 'destinatario', component: DestinatarioComponent, canActivate : [AuthGuard]},
    {path: 'transferencia', component: TransferenciaComponent, canActivate : [AuthGuard]},
    {path: 'registrarUsuario', component: RegistrarUsuarioComponent},
    {path: 'ingresarUsuario', component: IngresarUsuarioComponent}
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }