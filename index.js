class RENDER {
  async handleSvg() {
    const listSvg = document.querySelectorAll('svg[src]');
    listSvg.forEach(async (svg) => {
      const filePath = svg.getAttribute('src');
      const svgString = await this.loadSvgFile(filePath);
      const svgElement = this.convertStringToNodeElement(svgString)
      Array.from(svg.attributes).forEach(attr => {
        svgElement.setAttribute(attr.name, attr.value);
      });
      svg.replaceWith(svgElement)
    })
  }
  convertStringToNodeElement(string) {
    const div = document.createElement('div');
    div.innerHTML = string
    return div.firstElementChild
  }
  async loadSvgFile(filePath) {
    return fetch(filePath).then(html => html.text())
  }
}
(async () => {
  const load = new RENDER()
  load.handleSvg()
})()
