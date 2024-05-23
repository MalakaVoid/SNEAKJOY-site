window.addEventListener('load', function(e){

    let buttonChangeAdd = document.querySelector('#addFormChange')
    let buttonChangeEdit = document.querySelector('#editFormChange')
    let buttonChangeDelete = document.querySelector('#deleteFormChange')

    buttonChangeAdd?.addEventListener('click', () => changeCurrentBlock('.add_block'));
    buttonChangeEdit?.addEventListener('click', () => changeCurrentBlock('.edit_block'));
    buttonChangeDelete?.addEventListener('click', () => changeCurrentBlock('.delete_block'));

})

function changeCurrentBlock(newBlockTag){

    let addBlock = document.querySelector('.add_block');
    let editBlock = document.querySelector('.edit_block');
    let deleteBlock = document.querySelector('.delete_block');

    addBlock?.classList.remove('active');
    editBlock?.classList.remove('active');
    deleteBlock?.classList.remove('active');

    let block = document.querySelector(newBlockTag);
    block.classList.add('active');

}