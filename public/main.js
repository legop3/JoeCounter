const socket = io();

document.getElementById('increment').addEventListener('click', () => {
    socket.emit('increment');
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