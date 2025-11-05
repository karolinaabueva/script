function router() {
  const hash = location.hash || '#users';
  const config = routes[hash];
  const app = document.getElementById('app');
  app.innerHTML = '';

  renderBreadcrumbs(hash, app);

  const title = document.createElement('h2');
  title.textContent = config.title;
  app.appendChild(title);

  const input = document.createElement('input');
  input.className = 'search';
  input.placeholder = 'Поиск...';
  app.appendChild(input);

  const form = document.createElement('form');
  form.innerHTML = getFormHTML(hash);
  app.appendChild(form);

  let data = [];

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (config.localKey) {
      const localData = loadFromLocal(config.localKey);

      if (hash === '#users') {
        localData.push({
          name: form.querySelector('#newName').value,
          email: form.querySelector('#newEmail').value
        });
      }

      if (hash === '#users#todos') {
        localData.push({
          userId: +form.querySelector('#todoUserId').value,
          title: form.querySelector('#todoTitle').value,
          completed: false
        });
      }

      saveToLocal(config.localKey, localData);
      renderList([...data, ...localData]);
    }
  });

  fetch(config.url)
    .then(res => res.json())
    .then(apiData => {
      const localData = config.localKey ? loadFromLocal(config.localKey) : [];
      data = [...apiData, ...localData];
      renderList(data);

      input.addEventListener('input', () => {
        const val = input.value.toLowerCase();
        const filtered = val ? data.filter(item => config.filter(item, val)) : data;
        renderList(filtered);
      });
    });

  function renderList(items) {
    const old = app.querySelector('ul.list');
    if (old) old.remove();

    const ul = document.createElement('ul');
    ul.className = 'list';

    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = config.render(item);

      if (config.localKey && !item.id) {
        const btn = document.createElement('button');
        btn.textContent = 'Удалить';
        btn.onclick = () => {
          const local = loadFromLocal(config.localKey)
            .filter(i => JSON.stringify(i) !== JSON.stringify(item));
          saveToLocal(config.localKey, local);
          renderList([...data.filter(i => i.id), ...local]);
        };
        li.appendChild(btn);
      }

      ul.appendChild(li);
    });

    app.appendChild(ul);
  }
}
