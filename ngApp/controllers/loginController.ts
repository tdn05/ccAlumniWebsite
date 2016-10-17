namespace ccalummiwebsite.Controllers {
    export class LoginController {
        public loginInfo;
        private userName;

        constructor(private loginService: ccalummiwebsite.Services.LoginService,
                    private $state: ng.ui.IStateService){

        }

        login(){
            this.loginService.login(this.loginInfo)
            .then(()=>{
                this.$state.go('home')
            })
            .catch(()=>{
                alert('Login failed')
            })
        }
    }
}
