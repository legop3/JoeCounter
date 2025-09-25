const socket = io();

document.getElementById('increment').addEventListener('click', () => {

    comment = document.getElementById('comment').value
    // console.log(comment)
    socket.emit('increment', comment);
    document.getElementById('comment').value = ''
});

document.getElementById('decrement').addEventListener('click', () => {
    socket.emit('decrement');
});

socket.on('countUpdated', (newCount) => {
    document.getElementById('count').innerText = `Joe has hated rich people ${newCount} times.`;
    document.title = `Joe Counter: ${newCount}`;

    const coinsDiv = document.getElementById('coins');
    coinsDiv.innerHTML = '🪙'.repeat(newCount);
});

socket.on('commentList', (list) => {
    document.getElementById('commentlist').innerHTML = ''

    list.forEach(element => {
        console.log(element.comment)
        if(element.comment != ''){
            commentDiv = document.createElement('div')
            commentDiv.innerHTML = `<div id='comment'>${element.comment}</div>`
            commentDiv.classList.add('bg-gray-600', 'p-1', 'm-1', 'rounded-xl', 'text-center')
            document.getElementById('commentlist').appendChild(commentDiv)
        }
        
    });
})