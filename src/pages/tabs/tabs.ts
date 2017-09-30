import { Component } from '@angular/core';

import { BestPage } from '../best/best';
import { DecadePage } from '../decade/decade';
import { FavoritesPage } from '../favorites/favorites';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BestPage;
  tab2Root = DecadePage;
  tab3Root = FavoritesPage;

  constructor() {

  }

  select(){
    console.log('123');
  }
}
