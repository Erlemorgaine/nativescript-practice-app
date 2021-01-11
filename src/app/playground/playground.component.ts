import {Component, OnInit} from "@angular/core";
import { alert } from "tns-core-modules/ui/dialogs";
import * as fileSystem from "tns-core-modules/file-system";

@Component({
    selector: "gr-playground",
    moduleId: module.id,
    templateUrl: "./playground.component.html",
    styleUrls: ["./playground.component.css"]
})
export class PlaygroundComponent implements OnInit {
    public message: {subject, message} = {subject: '', message: ''};

    private fileName: string = "message.json";

    ngOnInit(): void {
        const file = fileSystem.knownFolders.documents().getFile(this.fileName);

        if (!!file) {
            this.message = JSON.parse(file.readTextSync());
        }
    }

    onTap(): void {
        console.log("Button tapped")

        const file = fileSystem.knownFolders.documents().getFile(this.fileName);
        const dataToWrite = JSON.stringify(this.message);

        file.writeText(dataToWrite);

        alert("Your message has been saved");
    }
}
