import { Component } from '@angular/core';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ModalComponent, DialogRef, CloseGuard} from 'angular2-modal';

import * as AppUtils from '../../utils/app.utils';
import { Router } from '@angular/router';

export class UpgradeModalContext extends BSModalContext {
    head_mess: string;
    content_mess: string;
    constructor(head_mess: string, content_mess: string) {
        super();
    }
}

@Component({
    selector: 'app-upgrade-modal',
    styleUrls: ['./upgrade-modal.component.css'],
    templateUrl: './upgrade-modal.component.html'
})
export class UpgradeModalComponent implements CloseGuard, ModalComponent<UpgradeModalContext> {
    context: UpgradeModalContext;

    // public wrongAnswer: boolean;
    public shouldUseMyClass: string;

    constructor(public dialog: DialogRef<UpgradeModalContext>, private router: Router) {
        console.log("UpgradeModalComponent");
        this.context = dialog.context;
        // this.wrongAnswer = true;
        dialog.setCloseGuard(this);
        dialog.context.dialogClass = 'upgrade-modal-dialog col-md-10 col-sm-12';
    }

    // onKeyUp(value) {
    //     this.wrongAnswer = value != 5;
    //     console.log("wrongAnser=" + this.wrongAnswer);
    //     this.dialog.close();
    // }

    beforeClose(): boolean {
        // return this.wrongAnswer;
        return false;
    }

    beforeDismiss(): boolean {
        return true;
    }

    ok() {
        this.router.navigate(['package']);
        this.dialog.close();
    }
}