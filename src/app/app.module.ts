import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HistorialComponent } from './components/historial/historial.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';
import { TransferenciaComponent } from './components/transferencia/transferencia.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrarUsuario.component';
import { IngresarUsuarioComponent } from './components/usuario/ingresarUsuario.component';
import { InterceptorService } from './interceptores/interceptor.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HistorialComponent,
    DestinatarioComponent,
    TransferenciaComponent,
    RegistrarUsuarioComponent,
    IngresarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : InterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
