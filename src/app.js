let count = 0;
document.getElementById('btn').addEventListener('click', () => {
  count++;
  document.getElementById('msg').textContent = 'Website hoạt động! Bạn đã bấm ' + count + ' lần.';
});
