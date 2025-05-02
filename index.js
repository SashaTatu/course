const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs')

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs', `${page}.ejs`)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер працює на http://localhost:${PORT}`)
  });


  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


app.use(express.urlencoded({extended: false}))

app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.get('/', (req, res) =>{
    const title = 'Головна'
    res.render(createPath('index'), { title })
})

app.get('/posts', (req, res) =>{
    const title = 'Пости'
    const posts =[
        {
            id:'1',
            text:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad',
            title:'Post title',
            data:'02.05.2025',
            author:'Sasha',
        }
    ]

    res.render(createPath('posts'), { title, posts })
})


app.get('/post/:id', (req, res) =>{
    const title = 'Деталі посту'
    const post = {
        id:'1',
        text:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad',
        title:'Post title',
        data:'02.05.2025',
        author:'Sasha',
    }
    res.render(createPath('post'), { title, post })
})


app.get('/add-post', (req, res) =>{
    const title = 'Додати пост'
    res.render(createPath('add-post'), { title })
})

app.post('/add-post', (req, res) =>{
    const { title, author, text} = req.body
    const post ={
        id: new Date().getTime(),
        data: new Date().toLocaleDateString('uk-UA'),
        title,
        author,
        text
    }
    res.render(createPath('post'), { post, title})
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
