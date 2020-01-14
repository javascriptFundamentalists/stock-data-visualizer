import Glide from '@glidejs/glide';
import { html } from 'lit-html';
import { unsplash } from '../unsplash/unsplash';
import { Component } from './Component';


/**
 * A basic impage component, expecting a url as a prop
 */
export class ImageComponent extends Component {
  template (data) {
    return html`
    <img src="${data.imageUrl}" alt="Unsplash Image" />
    `;
  }
}

/**
 * A Glide.js carousel component
 */
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
