function userInfo(userName, passWord, fullName, birthday, email, phone) {
    this.userName = userName;
    this.passWord = passWord; 
    this.fullName = fullName;
    this.birthday = birthday;
    this.email = email;
    this.phone = phone;
} 

var name = "123123" 

var tmp = new userInfo(name,name,name,name,name,name);

var tmp1 = {"test" : tmp};
console.log(tmp);

console.log(tmp1)