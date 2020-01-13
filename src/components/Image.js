import Glide from '@glidejs/glide';
//import { Autoplay } from '@glidejs/glide/dist/glide.modular.esm';
import { html } from 'lit-html';
import { unsplash } from '../unsplash/unsplash';
import { Component } from './Component';


export class ImageComponent extends Component {
  template (data) {
    return html`
    <img src="${data.imageUrl}" alt="Unsplash Image" />
    `;
  }
}

export class CarouselComponent extends Component {

  postMount () {
    this.glide = new Glide('.glide', {
      autoplay: 5000
    }).mount();
  }

  template (data) {
    return html`
      <div class="glide">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            ${data.carouselUrls.map(
              url => html`
                <li class="glide__slide">
                  <img src="${url}" alt="foo" />
                </li>
              `
            )};
          </ul>
        </div>
      </div>
    `;
  }
}
