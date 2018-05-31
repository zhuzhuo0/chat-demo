import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';

@NgModule({
  declarations: [
    ChatPage
  ],
  imports: [
    IonicPageModule.forChild(ChatPage),
    DirectivesModule
  ],
})
export class ChatPageModule { }
