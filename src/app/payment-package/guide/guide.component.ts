import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-guide',
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.css']
})
export class GuideComponent {

    feature: string = '';

    constructor(route: ActivatedRoute) {
        this.feature = route.snapshot.params['feature'];
    }
}