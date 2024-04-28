let user = localStorage.getItem('user');
console.log(user);
if (user == null){
    window.location.replace("/authorization");
}