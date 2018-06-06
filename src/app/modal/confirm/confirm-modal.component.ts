import { Component } from '@angular/core';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ModalComponent, DialogRef, CloseGuard} from 'angular2-modal';

export class ConfirmModalContext extends BSModalContext {
    constructor(head_mess: string, content_mess: string) {
        super();
    }
}

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements CloseGuard, ModalComponent<ConfirmModalContext> {
    context: ConfirmModalContext;

    public result: boolean;
    public shouldUseMyClass: string;

    constructor(public dialog: DialogRef<ConfirmModalContext>) {
        this.context = dialog.context;
        dialog.setCloseGuard(this);
    }

    beforeClose(): boolean {
        this.dialog.close(this.result);
        return true;
    }

    beforeDismiss(): boolean {
        return true;
    }

    ok() {
        this.result = true;
    }

    cancel() {
        this.result = false;
    }
}