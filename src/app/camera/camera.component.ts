import {Component, OnInit} from "@angular/core";
import * as camera from "nativescript-camera";
import * as fileSystem from "tns-core-modules/file-system";
import * as imgSrc from "tns-core-modules/image-source";

@Component({
    selector: "gr-camera",
    moduleId: module.id,
    templateUrl: "./camera.component.html",
    styleUrls: ["./camera.component.css"]
})
export class CameraComponent implements OnInit {
    title: string = '';
    genders: string[] = ['Man', 'Vrouw', 'Anders'];
    gender: string;
    day: string;
    month: string;
    year: string;
    image: any;
    file: string = 'pictures.json';

    ngOnInit(): void {
        const file = fileSystem.knownFolders.documents().getFile(this.file);

        if (file.readTextSync().length !== 0) {
            this.image = imgSrc.fromBase64(JSON.parse(file.readTextSync())['image']);
        }
    }

    onAddImage(): void {
        camera.requestPermissions().then(() => {
            camera.takePicture({width: 100, height: 100, keepAspectRatio: true})
                .then((imgAsset) => {
                    console.log("Picture taken");

                    this.image = imgAsset;
                    this.saveImage(imgAsset);
                })
                .catch((e) => console.log(e));
            });
    }

    saveImage(img): void {
        const file = fileSystem.knownFolders.documents().getFile(this.file);
        const dataToWrite = JSON.stringify({image: img.toBase64String("png")});

        file.writeText(dataToWrite);
    }

    onDone(): void {

    }
}
