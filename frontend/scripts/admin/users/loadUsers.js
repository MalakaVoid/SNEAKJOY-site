async function getAllUsers() {

    let response = await fetch('/api/users');
    let users = await response.json();
    return users.users;

}