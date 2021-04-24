const { basename, dirname, extname, join } = require('path');

const debug = require('debug')('metalsmith:own-markdown');
const marked = require('marked');

const plugin = (options = {}) => (files, metalsmith, done) => {
  const fileIsMarkdown = file => /\.md$|\.markdown$/.test(extname(file));

  // Headings data to construct ToC later
  let headings;
  // Start with level since wie only consider heading level 2 and higher for ToC
  let currentLevel;
  let nextId;
  let parentIds;

  marked.setOptions(options);

  // Custom renderer rules
  const renderer = {
    image(href, title, alt) {
      if (title) {
        return `<figure><img src="${href}" alt="${alt}" title="${title}"><figcaption>${title}</figcaption></figure>`;
      }
      else {
        return `<img src="${href}" alt="${alt}">`;
      }
    },
    // https://github.com/markedjs/marked/issues/773
    paragraph(text) {
      if (text.startsWith('<figure') && text.endsWith('</figure>')) {
        return text;
      }
      else {
        return `<p>${text}</p>`;
      }
    },
    heading(text, level, raw, slugger) {
      const slug = slugger.slug(text);

      // Generate ToC on the fly
      if (level > currentLevel) {
        // Make last item the current parent item
        const topItems = toc[toc.length - 1].items;
        toc.push(topItems[topItems.length - 1]);
      }
      else if (level < currentLevel) {
        // Remove parent items for each level
        for (let n = currentLevel - level; n > 0; n--) {
          toc.pop();
        }
      }
      currentLevel = level;
      toc[toc.length - 1].items.push({
        id: nextId++,
        text,
        slug,
        items: []
      });

      return `
        <h${level} id="${slug}">
          <a href="#${slug}" title="Permalink to '${text}'">${text}</a>
        </h${level}>
      `;
    }
  };

  marked.use({ renderer });

  Object.keys(files).forEach(fileIn => {
    if (!fileIsMarkdown(fileIn)) {
      return;
    }

    // Reset ToC information
    currentLevel = 2;
    nextId = 1;
    toc = [{
      items: []
    }];

    const fileData = files[fileIn];
    const directory = dirname(fileIn);
    const fileOut = join(directory, `${basename(fileIn, extname(fileIn))}.html`);

    const html = marked(fileData.contents.toString());

    fileData.contents = Buffer.from(html);

    // Create and attach ToC data
    fileData.toc = toc[0].items;
    
    delete files[fileIn];

    files[fileOut] = fileData;
  });
  done();
};

module.exports = plugin;
