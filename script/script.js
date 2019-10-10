'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // Экранная клавиатура
  {
    const keyboardButton = document.querySelector('.search-form__keyboard');
    const keyboard = document.querySelector('.keyboard');
    const closeKeyboard = document.getElementById('close-keyboard');
    const searchInput = document.querySelector('.search-form__input');

    const toggleKeyboard = () => {
      keyboard.style.top = keyboard.style.top ? '' : '50%';
    };

    const changeLanguage = (btn, lang) => {
      const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
        'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
        'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
        'en', ' '
      ];
      const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
        'ru', ' '
      ];

      if (lang === 'en') {
        btn.forEach((element, index) => {
          element.textContent = langEn[index];
        });
      } else {
        btn.forEach((element, index) => {
          element.textContent = langRu[index];
        });
      }
    }

    const typing = event => {
      const target = event.target;

      if (target.tagName.toLowerCase() === 'button') {
        switch (target.textContent.trim()) {
          case '':
            searchInput.value += ' ';
            break;
          case '⬅':
            searchInput.value = searchInput.value.substr(0, searchInput.value.length - 1);
            break;
          case 'en':
          case 'ru':
            const buttons = [...keyboard.querySelectorAll('button')].filter(element => element.style.visibility !== 'hidden');
            changeLanguage(buttons, target.textContent.trim());
            break;
          default:
            searchInput.value += target.textContent.trim();
        }
      }
    };

    keyboardButton.addEventListener('click', toggleKeyboard);
    closeKeyboard.addEventListener('click', toggleKeyboard);
    keyboard.addEventListener('click', typing);
  }

  // Меню
  {
    const burger = document.querySelector('.spinner');
    const sidebarMenu = document.querySelector('.sidebarMenu');

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      sidebarMenu.classList.toggle('rollUp');
    });

    sidebarMenu.addEventListener('click', e => {
      let target = e.target;
      target = target.closest('a[href="#"]');
      if (target) {
        const parentTarget = target.parentElement;
        parentTarget.classList.toggle('active');
        sidebarMenu.querySelectorAll('li').forEach(element => {
          if (element === parentTarget) {
            element.classList.add('active');
          } else {
            element.classList.remove('active');
          }
        });
      }
    });
  }

  // Модальное окно 
  {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="youTuberModal">
    <div id="youtuberClose">&#215;</div>
    <div id="youtuberContainer"></div>
    </div>
    `);

    const youtuberItems = document.querySelectorAll('[data-youtuber]');
    const youTuberModal = document.querySelector('.youTuberModal');
    const youtuberContainer = document.getElementById('youtuberContainer');

    const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
    const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

    const sizeVideo = () => {
      let ww = document.documentElement.clientWidth;
      let wh = document.documentElement.clientHeight;

      for (let i = 0; i < qw.length; i++) {
        if (ww > qw[i]) {
          youtuberContainer.querySelector('iframe').style.cssText = `
            width: ${qw[i]}px;
            height: ${qh[i]}px;
          `;
          youtuberContainer.style.cssText = `
            width: ${qw[i]}px;
            height: ${qh[i]}px;
            top: ${(wh - qh[i]) / 2}px;
            left: ${(ww - qw[i]) / 2}px;
          `;
          break;
        }
      }
    };

    youtuberItems.forEach(elem => {
      elem.addEventListener('click', () => {
        const idVideo = elem.dataset.youtuber;
        youTuberModal.style.display = 'block';

        const youTuberFrame = document.createElement('iframe');
        youTuberFrame.src = `https://www.youtube.com/embed/${idVideo}`;
        youTuberFrame.style.border = 'transparent';
        youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);

        window.addEventListener('resize', sizeVideo);
        sizeVideo();
      });
    });

    youTuberModal.addEventListener('click', () => {
      youTuberModal.style.display = '';
      youtuberContainer.textContent = '';
      window.removeEventListener('resize', sizeVideo);
    });
  }

  // YouTube
  
  {
    const API_KEY = 'AIzaSyDBQ5M8VfGQcvO6F0W-X5ecnoF6VG4qmNU';
    const CLIENT_ID = '900717935974-icil6vlsaeta45iuqcm7o1brb5tqo2eq.apps.googleusercontent.com';
  }
});
