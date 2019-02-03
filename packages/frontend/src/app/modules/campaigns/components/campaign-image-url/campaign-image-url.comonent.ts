import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campaign-image-url',
  templateUrl: './campaign-image-url.component.html',
  styleUrls: ['./campaign-image-url.component.css']
})

export class CampaignImageUrlComponent {
  @Input() imageUrl: string;
  defaultImageUrl = 'https://www.jensenleisurefurniture.com/wp-content/themes/jensen-leisure/media/woocommerce/product-placeholder.png';
}
