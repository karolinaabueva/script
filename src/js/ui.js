function renderBreadcrumbs(hash, container) {
  const map = {
    '#users': 'Пользователи',
    '#users#todos': 'Тудушки',
    '#users#posts': 'Посты',
    '#users#posts#comments': 'Комментарии'
  };

  const nav = document.createElement('nav');
  nav.className = 'breadcrumbs';

  const ul = document.createElement('ul');
  let path = '';

  hash.split('#').filter(Boolean).forEach(part => {
    path += `#${part}`;
    const li = document.createElement('li');
    li.textContent = map[path] || part;
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  container.appendChild(nav);
}

function getFormHTML(hash) {
  if (hash === '#users') {
    return `
      <input type="text" id="newName" placeholder="Имя" required />
      <input type="email" id="newEmail" placeholder="Email" required />
      <button type="submit">Добавить пользователя</button>
    `;
  }
  if (hash === '#users#todos') {
    return `
      <input type="number" id="todoUserId" placeholder="User ID" required />
      <input type="text" id="todoTitle" placeholder="Задача" required />
      <button type="submit">Добавить TODO</button>
    `;
  }
  return '';
}
