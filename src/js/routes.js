const routes = {
  '#users': {
    title: 'Пользователи',
    url: 'https://jsonplaceholder.typicode.com/users',
    filter: (item, val) => item.name.toLowerCase().includes(val) || item.email.toLowerCase().includes(val),
    render: item => `${item.name} (${item.email})`,
    localKey: 'customUsers'
  },
  '#users#todos': {
    title: 'Тудушки',
    url: 'https://jsonplaceholder.typicode.com/todos',
    filter: (item, val) => item.title.toLowerCase().includes(val),
    render: item => `${item.title} [${item.completed ? '✓' : '✗'}]`,
    localKey: 'customTodos'
  },
  '#users#posts': {
    title: 'Посты',
    url: 'https://jsonplaceholder.typicode.com/posts',
    filter: (item, val) => item.title.toLowerCase().includes(val) || item.body.toLowerCase().includes(val),
    render: item => `<strong>${item.title}</strong><br>${item.body}`
  },
  '#users#posts#comments': {
    title: 'Комментарии',
    url: 'https://jsonplaceholder.typicode.com/comments',
    filter: (item, val) => item.name.toLowerCase().includes(val) || item.body.toLowerCase().includes(val),
    render: item => `<strong>${item.name}</strong><br>${item.body}`
  }
};
