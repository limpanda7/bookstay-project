var fs = require('fs');

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
}