//バリデーションチェックのライブラリを読み込み
Vue.use(window.vuelidate.default)
const {required,email,not,sameAs} = window.validators;

//getパラメーターを取得（送信完了メッセージを表示するため）
var query = document.location.search.substring(1);
var element = query.split('=');

Vue.component('modal', {
	template: 
	`
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="modal-header">
						<p>送信確認</p>
					</div>

					<div class="modal-body">
						<p>お問い合わせを送信します。<br>よろしいですか？</p>
					</div>

					<div class="modal-footer">
						<button class="modal-button modal-success-button" type="submit">
							送信する
						</button>
						<button class="modal-button modal-secondary-button" @click="$emit('close')" type="button">
							戻る
						</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
	`
})

var app = new Vue({
	el: '#app',
	//入力項目の名前と初期値
	data: {
		name: '',
		address1_1: '',
		address1_2: '',
		address2: '未選択',
		address3: '',
		tel1: '',
		tel2: '',
		tel3: '',
		email: '',
		email_confirm: '',
		inquiry: '',
		agree: false,
		showModal: false,
		mailSend: element[1],
	},
	computed: {
		//郵便番号、都道府県、住所など、複数が必須項目の場合、算出プロパティとしてまとめる
		addressError: function() {
			var address1_1 = this.$v.address1_1.$dirty && !this.$v.address1_1.required;
			var address1_2 = this.$v.address1_2.$dirty && !this.$v.address1_2.required;
			var address2   = this.$v.address2.$dirty   && !this.$v.address2.required;
			var address3   = this.$v.address3.$dirty   && !this.$v.address3.required;
			return address1_1 || address1_2 || address2 || address3;
		},
		telError: function() {
			var tel1 = this.$v.tel1.$dirty && !this.$v.tel1.required;
			var tel2 = this.$v.tel2.$dirty && !this.$v.tel2.required;
			var tel3 = this.$v.tel3.$dirty && !this.$v.tel3.required;
			return tel1 || tel2 || tel3;
		},
		//セレクトボックスの初期値
		selectDefault: function(){
			return '未選択';
		},
		//チェックボックスの初期値
		checkDefault: function(){
			return false;
		}
	},
	methods: {
		//入力内容をすべてクリア
		reset: function(){
			this.name = '';
			this.address1_1 = '';
			this.address1_2 = '';
			this.address2 = '未選択';
			this.address3 = '';
			this.tel1 = '';
			this.tel2 = '';
			this.tel3 = '';
			this.email = '';
			this.email_confirm = '';
			this.inquiry = '';
			this.agree = false;
		},
		//送信確認モーダルの表示切替
		toggleModal: function(){
			this.showModal = !this.showModal;
		},
		//サブミット時の処理
		formSubmit: function(){
			//フォームのバリデーションチェック
			this.$v.$touch();

			if (!this.$v.$invalid) {
				//エラーが無ければ送信確認モーダルの表示を切り替える
				this.toggleModal();
			}
		}
	},
	//入力チェック内容
	validations: {
		name: {
			required
		},
		address1_1: {
			required: required
		},
		address1_2: {
			required: required
		},
		address2: {
			required: not(sameAs('selectDefault'))
		},
		address3: {
			required: required
		},
		tel1: {
			required: required
		},
		tel2: {
			required: required
		},
		tel3: {
			required: required
		},
		email: {
			email: email,
			required: required
		},
		email_confirm: {
			sameAs: sameAs('email')
		},
		inquiry: {
			required: required
		},
		agree: {
			required: not(sameAs('checkDefault'))
		}
	}
})