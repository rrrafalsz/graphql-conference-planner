import {Component, OnDestroy, OnInit} from '@angular/core';
import {Conference} from '../types';
import {chunk, unsubscribeAll} from '../../utils';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import {AllConferencesQuery, AllConferencesQueryResponse} from "../conference.apollo-query";
import {Apollo} from "apollo-angular/build/src";

@Component({
  selector: 'cp-conference-card-list',
  templateUrl: './conference-card-list.component.html',
  styles: []
})
export class ConferenceCardListComponent implements OnInit, OnDestroy {

  loading: boolean;
  allConferences: Conference[];
  subscriptions: Subscription[] = [];

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo.watchQuery<AllConferencesQueryResponse>({
      query: AllConferencesQuery
    }).subscribe(({data}) => {
      this.allConferences = data.allConferences;
      this.loading = data.loading;
    });

    //this.subscriptions = this.subscriptions.concat(allConferences$);
  }

  chunkConferences(conferences: Conference[] = []): Conference[][] {
    return chunk(conferences, 3);
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.subscriptions);
  }
}
