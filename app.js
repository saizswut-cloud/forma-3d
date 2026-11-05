
const models = window.FORMA_MODELS || [];
const grid = document.getElementById('grid');
const dialog = document.getElementById('viewerDialog');
const slot = document.getElementById('viewerSlot');

document.getElementById('year').textContent =
  new Date().getFullYear();

document.getElementById('count').textContent =
  `${models.length} модела`;

function viewer(model, interactive) {
  const el = document.createElement('model-viewer');
  el.setAttribute('src', model.file);
  el.setAttribute('alt', model.title);
  el.setAttribute('camera-orbit', '45deg 65deg auto');
  el.setAttribute('shadow-intensity', '1');
  el.setAttribute('environment-image', 'neutral');
  el.setAttribute('loading', 'lazy');

  if (interactive) {
    el.setAttribute('camera-controls', '');
    el.setAttribute('auto-rotate', '');
    el.setAttribute('touch-action', 'pan-y');
  }

  return el;
}

for (const model of models) {
  const card = document.createElement('button');
  card.className = 'tile';

  const thumb = document.createElement('div');
  thumb.className = 'thumb';

  if (model.enabled) {
    thumb.append(viewer(model, false));
  } else {
    const placeholder = document.createElement('span');
    placeholder.className = 'placeholder';
    placeholder.textContent = model.icon || '◈';
    thumb.append(placeholder);
  }

  const body = document.createElement('div');
  body.className = 'tilebody';

  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.textContent = model.category;

  const title = document.createElement('h3');
  title.textContent = model.title;

  const desc = document.createElement('p');
  desc.textContent = model.description;

  body.append(tag, title, desc);
  card.append(thumb, body);

  card.addEventListener('click', () => {
    document.getElementById('dialogTitle').textContent =
      model.title;
    document.getElementById('dialogDesc').textContent =
      model.description;

    slot.replaceChildren();

    if (model.enabled) {
      slot.append(viewer(model, true));
    } else {
      const p = document.createElement('p');
      p.textContent = 'Този модел още не е качен.';
      slot.append(p);
    }

    dialog.showModal();
  });

  grid.append(card);
}

document.getElementById('closeDialog')
  .addEventListener('click', () => dialog.close());

dialog.addEventListener('close', () => {
  slot.replaceChildren();
});
