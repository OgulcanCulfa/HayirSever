import React, { Component } from "react";
export default class Home extends Component {
  render() {
    return (
      <div className="container d-flex align-items-center">
        <div className="row card card-body my-lg-4">
          <div className="col-12">
            <h1 className="text-center">
              HayırSever uygulamasına hoşgeldiniz!
            </h1>
            <div className="">
              <div className=" text-center">
                <h5 className="mt-3">
                  Öğrenciler için hazırlanan bu uygulamada bir öğrenci olarak
                  ihtiyaç duyduğunuz şeyleri paylaşıp yardım alabilirsiniz.
                  Uygulama, sosyal medya formatında hazırlanmıştır.
                </h5>
              </div>
            </div>
            <div className="row no-gutters p-md-5 p-2">
              <div className="col-md-4 col-12 px-2">
                <div className="text-center">
                  <i>
                    <span className="fa fa-user fa-5x"></span>
                  </i>
                </div>
                <p className="mt-3 text-center">
                  <a href="/kayit">Buraya</a> tıklayarak kayıt olup hemen
                  uygulamayı kullanmaya başlayabilirsiniz. Eğer hesabınız var
                  ise <a href="/giris">buradan</a> giriş yapabilirsiniz.
                </p>
              </div>
              <div className="col-md-4 col-12">
              
                <div className="text-center">
                  <i>
                    <span className="fa fa-share fa-5x"></span>
                  </i>
                </div>
                <p className="mt-3 text-center">
                  Size sosyal medya mantığında ihtiyacını duyduğunuz şeylerin
                  fotoğrafını da çekerek paylaşabileceğiniz bir sistem
                  sunuyoruz.
                </p>
              </div>
              <div className="col-md-4 col-12 px-2">
                <div className="text-center">
                  <i>
                    <span className="fa fa-commenting fa-5x"></span>
                  </i>
                </div>
                <p className="mt-3 text-center">
                  Yardım almak ya da vermek istediğinizde sistemin içinde
                  bulunan entegre mesejlaşma uygulamasıyla kolayca iletişim
                  kurabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
