
initBattery()

function initBattery(){
    const batteryLiquid = document.querySelector('.battery__liquid'),
        batteryStatus = document.querySelector('.battery__status'),
        batteryPercentage = document.querySelector('.battery__percentage')

    navigator.getBattery().then((batt) => {
        updateBattery = () =>{
            /* 1. Actualizamos el número de nivel de la batería */
            let level = Math.floor(batt.level + 99)
            batteryPercentage.innerHTML = level + '%'

            /* 2. Actualizamos el nivel de fondo de la bateria */
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`

            /* 3. Validamos si la bateria esta llena, poca bateria y si está cargando o no */
            if(level == 100){ /* Validamos si la bateria esta llena */
                batteryStatus.innerHTML = `Full Battery <i class="ri-battery-2-fill green-color"></i>`
                batteryLiquid.style.height = '103%' /* Para esconder la elipse */
            }
            else if(level <= 20 &! batt.charging){
                batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`
            }
            else if(batt.charging){ /* Validamos si la batería esta cargando */
                batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`
            }
            else{ /* Si no esta cargando, no mostrará nada */
                batteryStatus.innerHTML = ''
            }

            /* 4. Cambiaremos los colores de la bateria y removemos los otros colores */
            if(level <= 20){
                batteryLiquid.classList.add('gradient-color-red'),
                batteryLiquid.classList.remove('gradient-color-orange', 'gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 40){
                batteryLiquid.classList.add('gradient-color-orange'),
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-yellow','gradient-color-green')
            }
            else if(level <= 80){
                batteryLiquid.classList.add('gradient-color-yellow'),
                batteryLiquid.classList.remove('gradient-color-orange', 'gradient-color-orange','gradient-color-green')
            }
            else{
                batteryLiquid.classList.add('gradient-color-green'),
                batteryLiquid.classList.remove('gradient-color-red', 'gradient-color-orange','gradient-color-yellow')
            }
        }
        updateBattery()

        /* 5. Eventos de Batería */
        batt.addEventListener('chargingchange', () => {updateBattery()})
        batt.addEventListener('levelchange', () => {updateBattery()})

    })    
}
