import {Component, OnInit} from "@angular/core";
import { User } from "../shared/user.model";
import { Page } from "tns-core-modules/ui/page";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "gr-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    public user: User = new User();

    constructor(
        private router: RouterExtensions,
        private page: Page
    ) {}

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    submit(url: string): void {
        this.router.navigate(["/" + url], {transition: {name: "slideBottom"}});
    }
}
