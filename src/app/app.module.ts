import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {environment} from "./environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatListModule} from "@angular/material/list";
import { MenuComponent } from './pages/menu/menu.component';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
//import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DateFormatPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(() => initializeApp({"projectId":"gasonline-2024","appId":"1:898770520093:web:ec5689ff4f2bf3f7565ef4","storageBucket":"gasonline-2024.appspot.com","apiKey":"AIzaSyAld9vih0XmfugHO0k8fZOZiGN8bUqhwlo","authDomain":"gasonline-2024.firebaseapp.com","messagingSenderId":"898770520093"}))
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
