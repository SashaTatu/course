const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs')

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs', `${page}.ejs`)

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Сервер працює на http://localhost:${PORT}`)
  });

app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.get('/', (req, res) =>{
    const title = 'Головна'
    res.render(createPath('index'), { title })
})

app.get('/posts', (req, res) =>{
    const title = 'Пости'
    res.render(createPath('posts'), { title })
})

app.get('/post', (req, res) =>{
    const title = 'Деталі посту'
    res.render(createPath('post'), { title })
})

app.get('/add-post', (req, res) =>{
    const title = 'Додати пост'
    res.render(createPath('add-post'), { title })
})

app.get('/contacts', (req, res) =>{
    const title = 'Контакти'
    const contacts = [
        {name: 'YouTube', link: 'https://youtube.com'},
        {name: 'Facebook', link: 'https://facebook.com'},
        {name: 'Instagram', link: 'https://instagram.com'}
    ]
    res.render(createPath('contacts'), { contacts, title })
})

app.use((req, res) =>{
    const title = 'Помилка'
    res
    .status(404)
    .render(createPath('error'), { title })
})
