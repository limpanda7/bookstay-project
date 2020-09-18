// 외부 모듈 추출
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var mysql = require('mysql');

// 서버 생성
var app = express();

// 서버 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 설정
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 데이터베이스 연결
var client = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'bookstay',
  timezone: 'utc'
})

client.connect();

// 페이지 라우트
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

// 404 에러 발생시 메시지 출력
app.use((req, res, next) => {
  next(createError(404));
});

// 에러 핸들러
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;