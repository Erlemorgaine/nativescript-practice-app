import { Component } from "@angular/core";
import { User } from "./shared/user.model";

@Component({
    selector: "gr-login",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    public user: User = new User();

    submit(): void {
        alert("Email is: " + this.user.email);
    }
}
