import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'publishers',
    loadChildren: './modules/publishers/publishers.module#PublishersModule'
  },
  {
    path: 'campaigns',
    loadChildren: './modules/campaigns/campaigns.module#CampaignsModule'
  },
  { path: '', redirectTo: '/publishers', pathMatch: 'full' },
  { path: '**', redirectTo: '/publishers' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
