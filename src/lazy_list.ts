const template = document.createElement("template");
template.innerHTML = `
<style>
  #list {
    height: 400px; /* Fixed height of the list container */
    overflow-y: scroll; /* Allow vertical scrolling */
    width: 100%;
    position: relative;
  }
  #spacer-top, #spacer-bottom {
    width: 100%;
  }
</style>
<div id="list">
  <div id="spacer-top"></div>
  <slot></slot>
  <div id="spacer-bottom"></div>
</div>
`;

export type Renderer<T> = (item: T) => HTMLElement;

export class LazyList<T> extends HTMLElement {
  #renderFunction: Renderer<T> = (item) => {
    const element = document.createElement("div");
    element.innerText = JSON.stringify(item);
    return element;
  };

  #data: T[] = [];
  #itemHeight: number = 50; // Roughly estimated height of each item
  #visibleItemsCount: number = 8; // Number of items to show at a time (based on #list height and item height)
  #topOffsetElement: HTMLElement;
  #bottomOffsetElement: HTMLElement;
  #listElement: HTMLElement;

  // Register the LazyList component as a custom element if not already defined
  static register() {
    if (!customElements.get("lazy-list")) {
      customElements.define("lazy-list", LazyList);
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Use type assertions to specify these elements as HTMLElements
    this.#topOffsetElement = this.shadowRoot!.querySelector(
      "#spacer-top",
    ) as HTMLElement;
    this.#bottomOffsetElement = this.shadowRoot!.querySelector(
      "#spacer-bottom",
    ) as HTMLElement;
    this.#listElement = this.shadowRoot!.querySelector("#list") as HTMLElement;

    // Event listener for scroll, recalculates visible items on each scroll event
    this.#listElement.addEventListener("scroll", () => {
      this.#updateVisibleItems();
    });
  }

  setData(data: T[]) {
    this.#data = data;
    this.#updateVisibleItems(); // Initial load of visible items
  }

  setRenderer(renderer: Renderer<T>) {
    this.#renderFunction = renderer;
  }

  #updateVisibleItems() {
    // Determine the first visible item based on current scroll position
    const scrollTop = this.#listElement.scrollTop;
    const firstVisibleIndex = Math.floor(scrollTop / this.#itemHeight);

    // Update top and bottom spacers based on visible items and current scroll position
    const totalHeight = this.#data.length * this.#itemHeight;
    const topSpacerHeight = firstVisibleIndex * this.#itemHeight;
    const bottomSpacerHeight =
      totalHeight -
      topSpacerHeight -
      this.#visibleItemsCount * this.#itemHeight;
    this.#topOffsetElement.style.height = `${topSpacerHeight}px`;
    this.#bottomOffsetElement.style.height = `${Math.max(0, bottomSpacerHeight)}px`;

    // Clear the current visible items and re-render the necessary items
    this.innerHTML = "";
    for (let i = 0; i < this.#visibleItemsCount; i++) {
      const index = firstVisibleIndex + i;
      if (index < this.#data.length) {
        const itemElement = this.#renderFunction(this.#data[index]);
        this.appendChild(itemElement);
      }
    }
  }
}

// Register the custom element
LazyList.register();
