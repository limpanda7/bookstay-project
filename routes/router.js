var fs = require('fs');
var mysql = require('mysql');

// 데이터베이스 연결
var client = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'bookstay',
  timezone: 'utc'
})

client.connect();

// 페이지 라우트
module.exports = function (app) {
  app.get('/', (request, response) => {
    response.render('index', {
      title: '100년 한옥 북스테이'
    });
  });

  app.get('/intro', (request, response) => {
    response.render('intro', {
      title: '100년 한옥 북스테이 :: 소개'
    });
  });

  app.get('/pictures', (request, response) => {
    response.render('pictures', {
      title: '100년 한옥 북스테이 :: 숙소사진'
    });
  });

  app.get('/location', (request, response) => {
    response.render('location', {
      title: '100년 한옥 북스테이 :: 오시는길'
    });
  });

  app.get('/booklist', (request, response) => {
    fs.readFile('views/booklist.ejs', 'utf8', (error, data) => {
      client.query('SELECT * FROM booklist ORDER BY published desc', (error, results) => {
        response.render('booklist', {
          title: '100년 한옥 북스테이 :: 도서목록',
          data: results
        });
      });
    });
  });

  app.get('/booklist-oldest', (request, response) => {
    fs.readFile('views/booklist.ejs', 'utf8', (error, data) => {
      client.query('SELECT * FROM booklist ORDER BY published asc', (error, results) => {
        response.render('booklist', {
          title: '100년 한옥 북스테이 :: 도서목록',
          data: results
        });
      });
    });
  });

  app.get('/booklist-title', (request, response) => {
    fs.readFile('views/booklist.ejs', 'utf8', (error, data) => {
      client.query('SELECT * FROM booklist ORDER BY title', (error, results) => {
        response.render('booklist', {
          title: '100년 한옥 북스테이 :: 도서목록',
          data: results
        });
      });
    });
  });

  app.get('/reservation', (request, response) => {
    fs.readFile('views/reservation.ejs', 'utf8', (error, data) => {
      client.query('SELECT * FROM reservation', (error, results) => {
        response.render('reservation', {
          title: '100년 한옥 북스테이 :: 예약현황',
          data: results
        });
      });
    });
  });

  app.post('/reservation', (request, response) => {
    client.query('SELECT * FROM reservation', (error, results) => {
      response.json(results)
    });
  });
}