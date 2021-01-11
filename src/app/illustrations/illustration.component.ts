import {Component, OnInit} from "@angular/core";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { View } from "tns-core-modules/ui/core/view";

interface IGrocery {
    name: string;
}

@Component({
    selector: "gr-illustration",
    moduleId: module.id,
    templateUrl: "./illustration.component.html",
    styleUrls: ["./illustration.component.css"]
})
export class IllustrationComponent implements OnInit {
    list: IGrocery[] = [];
    isLoading: boolean = false;

    ngOnInit(): void {
        this.isLoading = true;

        this.list = [
            {name: 'Dit'},
            {name: 'is'},
            {name: 'lijst'}
        ];

        setTimeout(() => this.isLoading = false, 3000)
    }

    onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args.object;
        const rightItem = swipeView.getViewById<View>("delete-view");
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.left = 0;
        swipeLimits.threshold = rightItem.getMeasuredWidth();
    }

    delete(args: ListViewEventData) {
        let grocery = <IGrocery>args.object.bindingContext;

        this.list = this.list.filter((i) => i.name !== grocery.name);
    }
}
