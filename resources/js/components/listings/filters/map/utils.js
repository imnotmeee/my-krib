import { divIcon } from 'leaflet';

function abbreviateNumber(number) {
    if (number < 1000)return number;
    if (number >= 1000 && number < 1000000) return (number / 1000).toFixed(1) + "k";
    if (number >= 1000000 && number < 1000000000) return (number / 1000000).toFixed(1) + "m";
    if (number >= 1000000000 && number < 1000000000000) return (number / 1000000000).toFixed(1) + "b";
    return (number / 1000000000000).toFixed(1) + "t";
  }
  
const icons = {};
export const fetchIcon = (count, size) => {
    if (!icons[count]) {
            icons[count] = divIcon({
            html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
                ${count}
            </div>`,
        });
    }
    return icons[count];
};

export const markerIcon = (price) => 
    divIcon({html: `<button class="custom-icon">$${abbreviateNumber(price)}</button>`});

export const showMarkerWhenHover = (price, isHover) => 
    divIcon({html: isHover ?
        `<button class='show-icon'>$${abbreviateNumber(price)}</button>` :
        null
    });
