# お問い合わせフォームサンプル

##概要
バリデーションチェックを行い、問題無ければ送信確認モーダルを表示する、お問い合わせフォームのひな形

##注意点
各ドメイン毎にreCAPTCHAを登録し、index.html 7,10行目にreCAPTCHAのsite keyを記入する。

  <script src='https://www.google.com/recaptcha/api.js?render=reCAPTCHAのsite keyを追加'></script>
  
  grecaptcha.execute('reCAPTCHAのsite keyを追加', {action: 'homepage'})
