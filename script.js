var map = L.map('map').setView([-22.887860, -43.111000], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var publicMarkers = [];

function addPublicMarkers() {
    publicMarkers.forEach(function(marker) {
        // Remove todos os marcadores do mapa
        map.removeLayer(marker);
    });
    publicMarkers = [];

    var orgaosPublicos = [
        { nome: '3º Grupamento de Bombeiro Militar', lat: -22.885, lng: -43.104, imagem: '{{ url_for('static', filename='img/legenda-vermelha.png') }}' },
        { nome: 'Corpo de Bombeiros Charitas', lat: -22.933051069248233, lng: -43.09906769797954, imagem: '{{ url_for('static', filename='img/legenda-vermelha.png') }}' },
        { nome: 'Corpo de Bombeiros de Itaipu 4 GMar', lat: -22.953566982714847, lng: -43.027985021671526, imagem: '{{ url_for('static', filename='img/legenda-vermelha.png') }}' },
        { nome: '76ª Delegacia de Polícia', lat: -22.893408960453563, lng: -43.118037468830465, imagem: '{{ url_for('static', filename='img/legenda-preta.png') }}' },
        { nome: '77ª DP - Delegacia Policial de Icaraí', lat: -22.908187790245876, lng: -43.10313126315783, imagem: '{{ url_for('static', filename='img/legenda-preta.png') }}' },
        { nome: '78º Polícia Civil', lat: -22.88104292360981, lng: -43.10794487705151, imagem: '{{ url_for('static', filename='img/legenda-preta.png') }}' },
        { nome: '79ª DP - Delegacia Policial de Jurujuba', lat: -22.933160531149614, lng: -43.09931299027052, imagem: '{{ url_for('static', filename='img/legenda-preta.png') }}' },
        { nome: '81ª DP, Itaipú', lat: -22.96643067600031, lng: -43.04091835832669, imagem: '{{ url_for('static', filename='img/legenda-preta.png') }}' },
        { nome: '12º Batalhão de Polícia Militar', lat: -22.885495044477196, lng: -43.11604851589526, imagem: '{{ url_for('static', filename='img/legenda-azul.png') }}' },
        { nome: 'Defesa Civil Municipal de Niterói', lat: -22.892141702258044, lng: -43.11828445326347, imagem: '{{ url_for('static', filename='img/legenda-laranja.png') }}' },
        { nome: 'Vigilância Sanitária', lat: -22.891175525011786, lng: -43.11898677624684, imagem: '{{ url_for('static', filename='img/legenda-verde.png') }}' },
        { nome: 'Vigilância Sanitária', lat: -22.88426345687803, lng: -43.1268130700638, imagem: '{{ url_for('static', filename='img/legenda-verde.png') }}' },
        { nome: 'PROCON Niterói', lat: -22.891910183231765, lng: -43.112075484259066, imagem: '{{ url_for('static', filename='img/legenda-roxa.png') }}' }
    ];

    orgaosPublicos.forEach(function(orgao) {
        var customIcon = L.icon({
            iconUrl: orgao.imagem,
            iconSize: [24, 39], // Ajuste o tamanho conforme necessário
            iconAnchor: [12, 39], // Ajuste a âncora conforme necessário
        });

        var marker = L.marker([orgao.lat, orgao.lng], { icon: customIcon });

        marker.on('click', function(e) {
            var popup = L.popup()
                .setLatLng(e.latlng)
                .setContent('<strong>' + orgao.nome + '</strong><br><a href="https://www.google.com/maps/search/?api=1&query=' + orgao.lat + ',' + orgao.lng + '" target="_blank">Ver no Google Maps</a>')
                .openOn(map);
        });

        publicMarkers.push(marker);
    });

    // Adiciona todos os marcadores ao mapa de uma vez
    L.layerGroup(publicMarkers).addTo(map);
}

$(function() {
    addPublicMarkers();
});
