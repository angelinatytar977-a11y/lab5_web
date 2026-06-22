document.addEventListener('DOMContentLoaded', () => {

    const saveSystemInfo = () => {
        const sysInfo = {
            ua: navigator.userAgent,
            platform: navigator.platform,
            time: new Date().toISOString()
        };
        localStorage.setItem('user_system', JSON.stringify(sysInfo));

        const infoFooter = document.getElementById('os-info-footer');
        if (infoFooter) {
            infoFooter.textContent = `System: ${sysInfo.ua}`;
        }
    };

    const initTheme = () => {
        const themeBtn = document.getElementById('theme-toggle');
        const body = document.body;

        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                body.classList.toggle('dark-theme');
            });
        }

        const hour = new Date().getHours();
        const isNight = hour < 7 || hour >= 21;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (isNight || prefersDark) {
            body.classList.add('dark-theme');
        }
    };

    saveSystemInfo();
    initTheme();
});