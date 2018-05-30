import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WsService } from './ws.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: WsService, useClass: WsService }
  ]
})
export class ServiceModule { }
