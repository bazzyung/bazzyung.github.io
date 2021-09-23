window.onload = function(){
    document.querySelector('.img__btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
});

$(loginBtn).click(e=>{
    console.log('로컬 스토리지에서 비교하여 검사하기')
    let $id = $(userid1);
    let $pwd = $(password1);

    // console.log($id.val())
    // console.log($pwd.val())
    // if($id.val() == '') return;

    let userArr = JSON.parse(localStorage.getItem('users'));
    // console.log(userArr);

    let flag = false;

    for(let i = 0; i < userArr.length; i++){
        if($id.val() == userArr[i]['id']){
            flag = true;
            
            if($pwd.val() == userArr[i]['pwd']){
                alert('로그인 성공');
                $id.val('');
                $pwd.val('');
                break;
            }else{
                alert('비밀번호가 일치하지 않습니다.')
                $pwd.select();
                break;
            }
        }else{
            // alert('미등록 아이디입니다.')
            $id.select();

        }
    }

    if(!flag){
        alert('미등록 아이디입니다.')
    }

});


document.getElementById('signinBtn').onclick = function(){

    // console.log('click')

    var userId = document.getElementById("userId");
    var pwd = document.getElementById("pwd");
    var pwdCheck = document.getElementById("pwdCheck");
    var userName = document.getElementById("userName");
    var email = document.getElementById("email");
    

    //1.아이디검사
    //첫글자는 반드시 영소문자로 이루어지고, 
    //숫자가 하나이상 포함되어야함.
    //아이디의 길이는 4~12글자사이
    var regExp1 = /^[a-z][a-z\d]{3,11}$/;
    var regExp2 = /[0-9]/;
    if(userId.value == '' || userId.value == null){
        alert('아이디는 필수 항목입니다.');
        return false;
    }else if(!/^[a-z]/.test(userId.value)){
        alert('아이디의 첫 글자는 영소문자로 시작해야 합니다.');
        return false;
    }else if(!/\d/.test(userId.value)){
        alert('아이디는 숫자가 하나 이상 포함되어야 합니다.');
        return false;
    }else if(!/.{4,12}/.test(userId.value)){
        alert('아이디의 길이는 4~12글자 사이여야 합니다..');
        return false;
    }


    
    //3.이름검사
    //한글2글자 이상만 허용. [가-힣] 으로 해도되긴 하지만 자음만(ㄱㄴㄷㄹ)있으면 필터링이 안됨
    var regExp3 = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/;
    if(!regExpTest(regExp3,userName,"한글2글자이상 입력하세요."))
    return false;
    
    
    
    //5.이메일 검사
    // 4글자 이상(\w = [a-zA-Z0-9_], [\w-\.]) @가 나오고
    // 1글자 이상(주소). 글자 가 1~3번 반복됨
    if(!regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, email, "이메일 형식에 어긋납니다."))
    return false;
    
    //2.비밀번호 확인 검사
    //숫자/문자/특수문자/ 포함 형태의 8~15자리 이내의 암호 정규식 
    //전체길이검사 /^.{8,15}$/
    //숫자하나 반드시 포함 /\d/ 
    //영문자 반드시 포함 /[a-zA-Z]/
    //특수문자 반드시 포함  /[\*!&]/
        
    var regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\*!&]/];

    for(let i = 0; i < regExpArr.length; i++){
        if(!regExpTest(regExpArr[i], pwd, "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다.")){
            return false;
        }
    }
    
    //비밀번호일치여부
    if(!isEqualPwd()){
        return false;
    }


       // 객체생성
       function User(id,pwd,name,email){
        this.id = id;
        this.pwd = pwd;
        this.name = name;
        this.email = email;
    }
    let newUser = new User(userId.value, pwd.value, userName.value, email.value);
    
    // 웹 스토리지에 저장하기.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users',JSON.stringify(users));
    // 폼 초기화
    // document.memberFrm.reset();
    newPage();
    
    function newPage()  {
        window.location.href = 'signin.html'
      }

    return true;

   function isEqualPwd(){
    if(pwdCheck.value == pwd.value){
        return true;
    }
    else{
        alert("비밀번호가 일치하지 않습니다.");
        pwd.select();
        return false;
    }
 }
    
    function regExpTest(regExp, el, msg){
        if(regExp.test(el.value))
            return true;
        //적합한 문자열이 아닌 경우
        alert(msg);
        el.value="";
        el.focus();
        return false;
    }
}



}