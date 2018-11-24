import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CampaignsViewComponent } from './components/campaigns-view/campaigns-view.component';
// import { NgxPermissionsGuard } from 'ngx-permissions';


const routes: Routes = [
  {path: '', component: CampaignsViewComponent}
  // { path: 'campaigns/:id', component: campaignDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule {
}
