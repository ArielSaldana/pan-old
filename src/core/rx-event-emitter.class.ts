// import Rx from 'rxjs/Rx';
// import { Observable, Subject } from 'rxjs/Observable';
// import * as Rx from 'rxjs/Rx';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

export class RXEventEmitter {
    subscription: any;
    subjects = {};
    hasOwnProp: any;

    constructor() {
        
    }

    createName (name) {
        return name;
    }

    emit(name, data) {
        let fnName = this.createName(name);
        if (!(this.subjects[fnName])) {
            return;
            // this.subjects[fnName] = new Subject()
        }
        this.subjects[fnName].next(data);
    }

    on(name, handler) {
        let fnName = this.createName(name);
        if (!(this.subjects[fnName])) {
            this.subjects[fnName] = new Subject();
        }
        return this.subjects[fnName].subscribe(handler);
    }

    dispose() {
        let subjects = this.subjects;
        for (let prop in subjects) {
            if (this.hasOwnProp.call(subjects, prop)) {
                subjects[prop].dispose();
            }
        }
    
        this.subjects = {};
    }
}
