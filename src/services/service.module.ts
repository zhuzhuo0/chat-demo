import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WsService } from './ws.service';
import { NativeService } from './native.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: WsService, useClass: WsService },
    { provide: NativeService, useClass: NativeService },
  ]
})
export class ServiceModule { }
