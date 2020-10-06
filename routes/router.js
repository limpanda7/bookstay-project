var fs = require('fs');
var mysql = require('mysql');

// 데이터베이스 연결
var client = mysql.createConnection({
  host: 'ao9moanwus0rjiex.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'i5tj9c2vy0sen0oj',
  password: 'xjdlen609pvcy64k',
  database: 'm5k8rp0vwbb54e23',
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
      client.query('SELECT * FROM booklist', (error, results) => {
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