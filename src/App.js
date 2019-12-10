import { html, render } from 'lit-html';

export const App = (parentId) => {

  const data = {
    parentId: parentId,
  }

  // the html template
  const template = () => {
    return (html`
      <div id="app">
        <h1>Hello World</h1>
      </div>
    `);
  }

  // helper to attach this to a parent element
  const mount = () => {
    parent = document.getElementById(data.parentId);
    render(template(), parent);
  }

  return {
    mount: mount,
  }
}

