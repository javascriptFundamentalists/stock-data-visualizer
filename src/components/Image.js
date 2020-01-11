import Glide from '@glidejs/glide';
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
    this.glide = new Glide('.glide').mount();
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
        <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
        </div>
      </div>
    `;
  }
}
