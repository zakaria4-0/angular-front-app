import {Component, OnInit} from '@angular/core';
import {SecurityService} from "./services/security.service";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  public profile?: KeycloakProfile;

  constructor(public keycloak: KeycloakService) {

  }


  async login() {
    await this.keycloak.login({
      redirectUri: window.location.origin
    });
  }

  logout() {
    this.keycloak.logout(window.location.origin);
  }

  ngOnInit(): void {
    if (this.keycloak.isLoggedIn()){
      this.keycloak.loadUserProfile().then(profile=>{
        this.profile=profile;
      });
    }
  }
}
