
document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if(input !== '') {
    clearInfo();
    showWarning(`${loading.style.display = 'block'}`);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=50cc3b5b201594a1dbefa1fdf55d0543&units=metric&lang=pt_br`;
    
    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed
      });
    } else {
      clearInfo();
      showWarning('Não encontamos esta localização');
      loading.style.display = 'none';
    }
  } else {
    clearInfo();
  }
});

function showInfo(json) {
  showWarning('');

  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
  document.querySelector('.iconTemp').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  document.querySelector('.resultado').style.display = 'flex';
    loading.style.display = 'none';
 }

 function clearInfo() {
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
 }


function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}

let loading = document.querySelector('.loading');
let error = document.querySelector('.error');

