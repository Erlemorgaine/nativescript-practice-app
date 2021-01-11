import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {LoginComponent} from "~/app/login/login.component";
import {IllustrationComponent} from "~/app/illustrations/illustration.component";
import {PlaygroundComponent} from "~/app/playground/playground.component";
import {CameraComponent} from "~/app/camera/camera.component";
import {SpeechComponent} from "~/app/speech/speech.component";

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "ill1", component: IllustrationComponent },
    { path: "play", component: PlaygroundComponent },
    { path: "camera", component: CameraComponent },
    { path: "speech", component: SpeechComponent }
];

export const navigatableComponents = [
  LoginComponent,
  IllustrationComponent,
  PlaygroundComponent,
  CameraComponent,
  SpeechComponent
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
