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

    const initModal = (delay = 60000) => {
        const modal = document.getElementById('contact-modal');
        const openBtn = document.getElementById('open-contact');
        const closeBtn = document.getElementById('closeModal');
        
        let wasInteracted = false; 

        if (!modal) return;

        const showModal = () => {
            if (!wasInteracted) {
                modal.style.display = 'flex';
                wasInteracted = true; 
            }
        };

        const hideModal = () => {
            modal.style.display = 'none';
            wasInteracted = true; 
        };

        setTimeout(showModal, delay);

        if (openBtn) {
            openBtn.onclick = () => {
                modal.style.display = 'flex';
                wasInteracted = true;
            };
        }

        if (closeBtn) {
            closeBtn.onclick = hideModal;
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) hideModal();
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display !== 'none') {
                hideModal();
            }
        });
    };

    const loadComments = async (variantId = 24) => {
        const list = document.getElementById('comments-list');
        if (!list) return;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/24/comments`);
            if (!response.ok) throw new Error('Помилка мережі');
            
            const data = await response.json();
            list.innerHTML = ''; 

            data.slice(0, 3).forEach(comment => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${comment.email}</strong>: "${comment.body}"`;
                list.appendChild(li);
            });
        } catch (error) {
            console.error('Помилка завантаження коментарів:', error);
            list.innerHTML = '<li>Не вдалося завантажити відгуки.</li>';
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

    const initFormspree = () => {
        const feedbackForm = document.getElementById('feedback-form');
        const modal = document.getElementById('contact-modal');

        if (feedbackForm) {
            feedbackForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                const submitBtn = feedbackForm.querySelector('.submit-btn');
                const originalBtnText = submitBtn.textContent;
                
                submitBtn.textContent = 'Надсилаємо...';
                submitBtn.disabled = true;

                const formData = new FormData(feedbackForm);

                try {
                    const response = await fetch(feedbackForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        alert('Дякую! Ваше повідомлення надіслано.');
                        feedbackForm.reset();
                        modal.style.display = 'none';
                    } else {
                        alert('Помилка при відправці. Спробуйте ще раз.');
                    }
                } catch (error) {
                    alert('Помилка мережі. Перевірте з’єднання.');
                } finally {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }
    };


    saveSystemInfo();
    loadComments(1);
    initModal(60000); // 1 хвилина
    initTheme();
    initFormspree();
});