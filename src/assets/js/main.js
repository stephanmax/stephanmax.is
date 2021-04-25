var container = document.querySelector(".article-content");

if (container) {
  var headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: [1],
  };

  var observedHeadings = new IntersectionObserver(setCurrent, options);

  headings.forEach(h => observedHeadings.observe(h));

  function setCurrent(e) {
    var tocItems = document.querySelectorAll("[aria-label=\"Article Contents\"] li");
    // Use `some` instead of `forEach` so that we can short-circuit via `return true`
    e.some(hit => {
      if (hit.isIntersecting) {
        // Heading enters viewport
        tocItems.forEach(item => item.classList.remove("current"));
        document.querySelector(`[data-slug="${hit.target.id}"]`).classList.add("current");
        return true;
      }
      else if (hit.boundingClientRect.y > 0) {
        // Heading leaves viewport on the bottom
        var headingsArray = Array.prototype.slice.call(headings);
        tocItems.forEach(item => item.classList.remove("current"));
        var headingIndex = headingsArray.findIndex(heading => heading.id === hit.target.id);
        if (headingIndex > 0) {
          var headingBefore = headings.item(headingsArray.findIndex(heading => heading.id === hit.target.id) - 1);
          document.querySelector(`[data-slug="${headingBefore.id}"]`).classList.add("current");
        }
        return true;
      }
    });
  }
}
