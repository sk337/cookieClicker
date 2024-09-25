(() => {
    const script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/sk337/cookieClicker/refs/heads/main/dist/index.js';
    script.id = 'self.script';
    script.defer = true;
    document.body.appendChild(script);
})();